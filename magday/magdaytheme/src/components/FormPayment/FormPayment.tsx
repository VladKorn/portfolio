import React from "react";
import {siteUrl } from "../../xxxx.js";
// import Swal from "sweetalert2";
import "./index.css";

interface Props {
	id: number;
}
const Swal = (window as any).Swal;

let formData = {};

const FormPayment = (props: Props) => {
	const makePayment = () => {
		console.log("makePayment", props.id);
		fetch(`${siteUrl}payments/yandex/form.php`, {
			method: "POST",
			body: JSON.stringify({ id: props.id, data: formData }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					console.log(res.form);
					let jsPaymentFormWrap = document.querySelector<HTMLElement>(
						"#jsPaymentFormWrap"
					);
					if (jsPaymentFormWrap) {
						jsPaymentFormWrap.innerHTML = res.form;
						jsPaymentFormWrap.querySelector("form")?.submit();
					}
				} else {
					Swal.fire({
						icon: "error",
						title:
							"Ошибка, пожалуйста свяжитесь с нами для решения проблемы",
						// text: 'на вашу почту пришло письмо для подтверждения пароля'
						// showConfirmButton: false,
					});
				}
			});
	};
	return (
		<section id="sct-form-payment">
			<div id="jsPaymentFormWrap" style={{display: 'none'}}></div>

			<button
				type="submit"
				onClick={makePayment}
				className="checkout_button robokassa_pay_button"
			>
				Перейти к оплате →
			</button>
		</section>
	);
};

export default FormPayment;
