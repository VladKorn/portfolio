import React, { useState } from "react";
import "./index.css";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { ApiCallback } from "./../../xxxx.js";
import PhoneInput from "./../PhoneInput/PhoneInput";

interface Props {
	setCallbackIsOpen: (x: boolean) => void;
}
const Swal = (window as any).Swal;

const Callback = (props: Props) => {
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const close = () => {
		props.setCallbackIsOpen(false);
	};
	const onSubmit = (event: any) => {
		event.preventDefault();
		fetch(ApiCallback, {
			method: "post",
			body: JSON.stringify({
				phone,
				name,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("Callback res", res);
				if (res.success) {
					close();
					Swal.fire({
						icon: "success",
						text:
							"Наш оператор свяжится с Вами для уточнения деталей заказа",
					});
				} else {
					alert(res.error);
				}
			});
		//
	};

	return (
		<section className="Callback Modal">
			<div className="overlay" onClick={close}></div>
			<form action="" onSubmit={onSubmit} className="Modal--content">
				<button type="button" className="close" onClick={close}>
					x
				</button>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(name) => setName(name.target.value)}
					className="input"
					placeholder="Ваше имя"
					required={true}
				/>
				{/* <PhoneInput
					country={"ru"}
					onlyCountries={["ru"]}
					inputProps={{ className: "input" }}
					value={phone}
					placeholder="телефон"
					disableDropdown={true}
					disableSearchIcon={true}
					onChange={(phone) => setPhone(phone)}
				/> */}
				<PhoneInput onChange={(phone) => setPhone(phone)} />
				<p>
					Наш оператор свяжится с Вами
					<br /> для уточнения деталей заказа
				</p>
				<button type="submit" className="button gray submit">
					Отправить
				</button>
			</form>
		</section>
	);
};
export default Callback;
