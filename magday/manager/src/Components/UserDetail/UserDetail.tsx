import React from "react";
import { Divider} from "antd";

interface Props {
	user: any;
}

const UserDetail = (props: Props) => {
	return (
		<section className="UserDetail">
			<Divider orientation="left">Информация о клиенте</Divider>
			<div className="block">
				{props.user && (
					<ul>
						<li>{props.user.id}</li>
						<li>{props.user.name}</li>
						<li>{props.user.email}</li>
					</ul>
				)}
			</div>
		</section>
	);
};

export default UserDetail;
