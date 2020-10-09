import React from "react";
import img from "../../images/ComingSoon.gif";
import "./index.css";
interface Props {
	setSeo?: SetSeo;
}

const ComingSoon = (props: Props) => {
	if (props.setSeo) {
		props.setSeo({
			title: "Magday - страница в разработке",
			description: "",
			keywords: "",
		});
	}
	return (
		<div className="ComingSoon">
			<h3>Страница в разработке</h3>
			<img src={img} alt="" />
		</div>
	);
};

export default ComingSoon;
