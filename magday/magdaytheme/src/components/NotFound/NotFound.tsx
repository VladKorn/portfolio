import React from "react";
import "./index.css";
// import img from "./404.jpg";
import { Link } from "react-router-dom";

interface Props {
	setSeo?: SetSeo;
}

const NotFound = (props: Props) => {
	if (props.setSeo) {
		props.setSeo({
			title: "Magday - страница не найдена (404)",
			description: "",
			keywords: "",
		});
	}
	return (
		<section className="NotFound">
			<div className="NotFound-overlay">
				<b className="code">404 - Not Found</b>
				<Link className="button gray" to="/">
					Go Home
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
