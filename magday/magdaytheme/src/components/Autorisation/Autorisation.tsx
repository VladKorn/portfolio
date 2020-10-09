import React, { useState } from "react";
import { siteUrl } from "../../xxxx.js";
import "./index.css";

type Type = "signIn" | "signUp" | "forgot";
type FormData = SignIn | SignUp | Forgot | null;
type SignIn = { type: "signIn"; login: string; password: string };
type SignUp = { type: "signUp"; email: string , name: string };
type Forgot = { type: "forgot"; email: string };

interface Props {
	setUser: any;
	AutorisationToggle: any;
	isOpen: boolean;
}

const Autorisation = (props: Props) => {
	const [type, setType] = useState<Type>("signIn");
	// const [isOpen, setIsOpen] = useState(true);
	const [isError, setIsError] = useState(false);
	// const [formData, setFormData] = useState<FormData>(null);
	const closeModal = () => {
		props.AutorisationToggle();
	};
	const toggleType = () => {
		type === "signIn" ? setType("signUp") : setType("signIn");
	};
	const onSubmit = (event: any) => {
		console.log("onSubmit");
		event.preventDefault();
		const form = event.target;
		console.log("event", form);
		const name = form.querySelector(`input[name='name']`)?.value;
		const pass = form.querySelector(`input[name='password']`)?.value;
		const email = form.querySelector(`input[name='email']`)?.value;
		let formData:FormData = null;
		if(type === "signIn"){
			formData = {
				login: email,
				password: pass,
				type: "signIn",
			};
			
		}
		if(type === "signUp"){
			formData = {
				email: email,
				name: name,
				type: "signUp",
			};
		}
		if(type === "forgot"){
			formData = {
				email: email,
				type: "forgot",
			};
		}
		

		fetch(`${siteUrl}api/user.php`, {
			method: "POST",
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					if(type === "forgot"){
						setType("signIn");
					} else{
						closeModal();
						props.setUser(res.user);
					}
				} else {
					setIsError(true);
					alert(res.error);
				}
			});
	};
	if (!props.isOpen) {
		return null;
	}

	return (
		<div className="Autorisation Modal">
			<div className="overlay" onClick={closeModal}></div>
			<form
				action=""
				className={isError ? "heve-error Modal--content" : "Modal--content"}
				onFocus={() => {
					setIsError(false);
				}}
				onSubmit={onSubmit}
			>
				<button type="button" className="close" onClick={closeModal}>
					x
				</button>
				<div className="top-wrap">
					<span>
						{type === "signIn"
							? "Вход"
							: type === "forgot"
							? "Забыли пароль?"
							: "Регистрация"}
					</span>
					<button className="link" type="button" onClick={toggleType}>
						{type === "signIn" ? "Регистрация" : "Вход"}
					</button>
				</div>
				<hr />
				{type === "signUp" ? (
					<input
						type="text"
						name="name"
						className="input"
						placeholder="Вашe имя"
						required={true}
					/>
				) : null}
				<input
					type="email"
					name="email"
					className="input"
					placeholder="Ваш email"
					required={true}
				/>
				{type === "signIn" ? (
					<input
						type="password"
						name="password"
						className="input"
						placeholder="Ваш пароль"
						required={true}
					/>
				) : null}

				<div className="btn-wrap">
					<button type="submit" className="button gray submit">
						{type === "signUp" ? "Зарегистрироваться" : null}
						{type === "signIn" ? "Войти" : null}
						{type === "forgot" ? "Сбросить пароль" : null}
					</button>

					{type !== "forgot" ? (
						<button
							type="button"
							className="link"
							onClick={() => {
								setType("forgot");
							}}
						>
							Забыли пароль?
						</button>
					) : null}
				</div>
			</form>
		</div>
	);
};

export default Autorisation;
