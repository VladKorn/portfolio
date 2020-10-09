import React from "react";
import "./index.css";
interface Props {
	user: User | null;
	logout: any;
}

const PageUser = (props: Props) => {
	const { user } = props;
	if (!user) {
		return null;
	}
	return (
		<section id="PageUser" className="container">
			<ul>
				<li>
					Имя:&nbsp;<span> {user.name}</span>
				</li>
				<li>
					Почта:&nbsp;<span> {user.email}</span>
				</li>
				<li>
					Скидка:&nbsp;
					<span> {user.discount ? user.discount : "0%"}</span>
				</li>
				<li>
					ID:&nbsp;<span>{user.id}</span>
				</li>
			</ul>
			<div className="button gray" onClick={props.logout}>
				Выход
			</div>
		</section>
	);
};

export default PageUser;
