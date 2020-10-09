import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
interface Props {
	manager: Manager;
	setManager: (manager: Manager) => void;
}

const Login: React.FC<Props> = (props: Props) => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const manager: Manager = {
		login,
		password
	};
	const submit = () => {
		fetch(`https://yesbeat.ru/admin-api/index.php`, {
			method: "post",
			body: JSON.stringify({ manager: manager })
		})
			.then(res => res.json())
			.then(res => {
				console.log("app Login res", res);
				if (res.error) {
					alert("error " + res.error);
				} else {
					props.setManager(res.manager);
				}
			});
	};
	return (
		<section id="login-form">
			<TextField
				onChange={event => {
					setLogin(event.target.value);
				}}
				label="Login"
				value={login}
			/>
			<TextField
				onChange={event => {
					setPassword(event.target.value);
				}}
				label="Password"
				value={password}
			/>
			<Button variant="contained" color="primary" onClick={submit}>
				Submit
			</Button>
		</section>
	);
};

export default Login;
