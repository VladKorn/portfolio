import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

interface Props {
	className?: string;
	items: Array<any>;
}

const NavByPages = (props: Props) => {
	if (props.items && !props.items.length) {
		return null;
	}
	const className = "NavByPages " + props.className;
	return (
		<nav className={className}>
			<ul className="line-list">
				{props.items.map((item: any) => (
					<li key={item.ID}>
						<NavLink
							exact
							to={
								item.url.split(".ru")[1]
									? "" + item.url.split(".ru")[1]
									: "/"
							}
						>
							{item.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavByPages;
