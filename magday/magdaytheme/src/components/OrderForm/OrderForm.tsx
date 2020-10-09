import React, { useState, useEffect } from "react";
// import InputMask from "react-input-mask";
import PhoneInput from "./../PhoneInput/PhoneInput";

import { useHistory } from "react-router-dom";
import { orderRestUrl } from "../../xxxx.js";
// import LocationSearchInput from "./../Autocomplete/Autocomplete"
import DateTimePicker from "react-datetime-picker";
// import Swal from "sweetalert2";
import "./index.css";

interface Props {
	user: User | null;
	isAuthorized: boolean;
	basketItems: any;
}
const Swal = (window as any).Swal;
const cities = ["Королев", "Мытищи", "Ивантеевка"];
const DateNow: any = new Date();
DateNow.addHours = function (h: number) {
	var copiedDate = new Date();
	copiedDate.setTime(this.getTime() + h * 60 * 60 * 1000);
	return copiedDate;
};
const minData = DateNow.addHours(2);

const OrderForm = (props: Props) => {
	const history = useHistory();

	const [name, setName] = useState(props.user?.name || "");
	const [email, setEmail] = useState(props.user?.email || "");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("Королёв");
	const [dom, setDom] = useState("");
	const [korpus, setKorpus] = useState("");
	const [kvartira, setKvartira] = useState("");
	const [podezd, setPodezd] = useState("");
	const [kodDomofona, setKodDomofona] = useState("");
	const [etaj, setEtaj] = useState("");

	const [sdacha, setSdacha] = useState("");
	const [confirm, setConfirm] = useState(false);
	const [bezkontaktnazDostavka, setBezkontaktnazDostavka] = useState(false);
	const [paymetMethod, setPaymetMethod] = useState("cash");
	const [comment, setComment] = useState("");
	const [date, setDate] = useState("now");

	const submit = (event: any) => {
		event.preventDefault();
		let formData: any = {
			name,
			email,
			city,
			address,
			phone,
			dom,
			korpus,
			kvartira,
			podezd,
			kodDomofona,
			etaj,
			sdacha,
			confirm,
			bezkontaktnazDostavka,
			paymetMethod,
			comment,
			date,
		};
		if (props.user) {
			formData["user"] = props.user;
		}

		formData[`type`] = "set";
		formData[`items`] = [];

		props.basketItems.forEach((_item: BasketLocalItem, index: any) => {
			formData[`items`].push({
				product_id: _item.id,
				quantity: _item.quantity,
				weekIndex: _item.weekIndex,
			});
			// console.log(`asd , asd2` ,prodId , index)
		});

		if (props.isAuthorized) {
			console.log("props.user", props.user);
			formData["userId"] = props.user?.id;
		}
		fetch(`${orderRestUrl}`, {
			method: "POST",
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("order res", res);
				if (res.success) {
					// window.location.pathname = `order/${res.url}`;
					history.push(`order/${res.url}`);

					localStorage.basketItems = "";
					Swal.fire({
						icon: "success",
						title: "Ваш заказ принят",
						// text: 'на вашу почту пришло письмо для подтверждения пароля'
						// showConfirmButton: false,
					});
				} else {
					alert("error");
				}
			})
			.catch(function (error) {
				console.log("Request failed", error);
			});
	};
	useEffect(() => {
		setName(props.user?.name || "");
		setEmail(props.user?.email || "");
	}, [props.isAuthorized, props.user]);
	return (
		<section className="OrderForm container">
			<h2 className="section--title">оформление заказа</h2>
			<hr />
			<form action="" onSubmit={submit}>
				<p className="form-title">Кому доставить</p>
				<div className="fieldset">
					<label>
						<span className="side-label">Ваше имя*</span>
						<input
							className="input"
							// placeholder="Ваше имя*"
							type="text"
							name="name"
							value={name}
							onChange={(event) => {
								setName(event.currentTarget.value);
							}}
							required
						/>
					</label>
				</div>
				<div className="fieldset">
					<label>
						<span className="side-label">Почта*</span>
						<input
							className="input"
							// placeholder="Ваш Email*"
							type="email"
							name="email"
							value={email}
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
							required
						/>
					</label>
				</div>
				<div className="fieldset">
					<label>
						<span className="side-label">Телефон*</span>
						{/* <InputMask
							className="input"
							required
							mask="+7 (999) 999-99-99"
							// placeholder="Ваш телефон*"
							name="phone"
							value={phone}
							onChange={(event: any) => {
								setPhone(event.currentTarget.value);
							}}
						/> */}
						<PhoneInput
							onChange={(value: string) => {
								setPhone(value);
							}}
						/>
					</label>
				</div>
				<div className="fieldset">
					<label>
						<span className="side-label strong">Куда везем*</span>
						<select
							required
							name="city"
							className="select"
							onChange={(event) => {
								setCity(event.currentTarget.value);
							}}
							value={city}
						>
							<option key="def" value="" disabled>
								{" "}
								Город
							</option>
							{cities.map((item) => {
								return (
									<option key={item} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</label>
				</div>

				{/* <input
					placeholder="Город*"
					type="text"
					name="city"
					value={city}
					onChange={(event) => {
						setCity(event.currentTarget.value);
					}}
					required
				/> */}
				<div className="fieldset">
					<span className="side-label">Адрес*</span>
					<div className="wrap">
						<label className="compact">
							<span>Улица*</span>
							<input
								// placeholder="Улица*"
								className="input"
								type="text"
								name="address"
								value={address}
								onChange={(event) => {
									setAddress(event.currentTarget.value);
								}}
								required
							/>
						</label>
						<label className="compact">
							<span>Дом*</span>
							<input
								className="small input"
								required
								// placeholder="Дом*"
								type="text"
								name="dom"
								value={dom}
								onChange={(event) => {
									setDom(event.currentTarget.value);
								}}
							/>
						</label>
						<label className="compact">
							<span>Корпус</span>
							<input
								className="input small"
								// placeholder="Корпус"
								type="text"
								name="korpus"
								value={korpus}
								onChange={(event) => {
									setKorpus(event.currentTarget.value);
								}}
							/>
						</label>
						<label className="compact">
							<span>Кв./офис</span>
							<input
								className="input small"
								// placeholder="Кв./офис"
								type="text"
								name="kvartira"
								value={kvartira}
								onChange={(event) => {
									setKvartira(event.currentTarget.value);
								}}
							/>
						</label>
						<label className="compact">
							<span>Подъезд</span>
							<input
								className="input small"
								// placeholder="Подъезд"
								type="text"
								name="address"
								value={podezd}
								onChange={(event) => {
									setPodezd(event.currentTarget.value);
								}}
							/>
						</label>
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label"></span>
					<div className="wrap">
						<label className="compact">
							<span>Код домофона</span>
							<input
								// placeholder="Код домофона"
								className="input"
								type="text"
								name="kodDomofona"
								value={kodDomofona}
								onChange={(event) => {
									setKodDomofona(event.currentTarget.value);
								}}
							/>
						</label>
						<label className="compact">
							<span>Этаж</span>
							<input
								className="small input"
								// placeholder="Этаж"
								type="text"
								name="etaj"
								value={etaj}
								onChange={(event) => {
									setEtaj(event.currentTarget.value);
								}}
							/>
						</label>
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label">Дата и время доставки</span>
					<div className="wrap">
						<button
							className={
								date === "now"
									? "button gray tab isActive"
									: "button gray tab"
							}
							onClick={() => {
								setDate("now");
							}}
						>
							Доставить сейчас
						</button>
						<button
							className={
								date === "now"
									? "button gray tab "
									: "button gray tab isActive"
							}
							onClick={() => {
								setDate(minData);
							}}
						>
							Ко времени
						</button>
						<div className="date-wrap">
							{date === "now" ? (
								<>
									<p>
										Ориентировочное время доставки{" "}
										<b>уточняйте у оператора</b>{" "}
									</p>
								</>
							) : (
								<DateTimePicker
									// format="dd h:mm"
									locale={"ru-ru"}
									clearIcon={null}
									format={"y-MM-dd H:mm"}
									minDate={minData}
									onChange={setDate}
									value={date}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label strong">Способ оплаты</span>
					<div className="wrap column">
						<label className="ratio">
							<input
								required
								type="radio"
								name="paymetMethod"
								value="on_site"
								checked={paymetMethod === "on_site"}
								onChange={(event) => {
									setPaymetMethod(event.currentTarget.value);
								}}
							/>
							<span> Банковской картой на сайте </span>
						</label>
						<label className="ratio">
							<input
								type="radio"
								name="paymetMethod"
								value="cash"
								required
								onChange={(event) => {
									setPaymetMethod(event.currentTarget.value);
								}}
								checked={paymetMethod === "cash"}
							/>
							<span> Наличными курьеру</span>
						</label>
						{paymetMethod === "cash" ? (
							<>
								<label className="compact">
									<span>Сдача с</span>
									<input
										className="input"
										// placeholder="1000/2000/5000"
										type="text"
										name="sdacha"
										value={sdacha}
										onChange={(event) => {
											setSdacha(
												event.currentTarget.value
											);
										}}
									/>
								</label>
							</>
						) : null}
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label strong red">
						Бесконтактная доставка
					</span>
					<div className="wrap">
						<label className="label-checkbox">
							<input
								type="checkbox"
								name="bezkontaktnazDostavka"
								checked={bezkontaktnazDostavka}
								onChange={(event) => {
									setBezkontaktnazDostavka(
										event.currentTarget.checked
									);
								}}
							/>
							<span>Оствить у двери</span>
						</label>
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label strong">
						Подтверждение заказа
					</span>
					<div className="wrap">
						<label className="label-checkbox">
							<input
								type="checkbox"
								name="confirm"
								checked={confirm}
								onChange={(event) => {
									setConfirm(event.currentTarget.checked);
								}}
							/>
							<span>Звонок оператора</span>
						</label>
					</div>
				</div>
				<div className="fieldset">
					<span className="side-label strong">
						Комментарий к заказу
					</span>
					<div className="wrap">
						<label>
							<textarea
								cols={40}
								rows={3}
								name="comment"
								value={comment}
								onChange={(event) => {
									setComment(event.currentTarget.value);
								}}
							/>
						</label>
					</div>
				</div>

				<div className="button-wrap">
					<button className="button gray" type="submit">
						Оформить заказ
					</button>
				</div>
			</form>
		</section>
	);
};

export default OrderForm;
