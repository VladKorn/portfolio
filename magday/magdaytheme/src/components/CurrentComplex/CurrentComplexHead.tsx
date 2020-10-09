import React from "react";
import "./index.css";
import bg from "../../images/assets/CurrentComplexHead__bg.png";
interface Props {
	text1: string;
	text2: string;
}
const CurrentComplexHead = (props: Props) => {
	return (
		<section
			className="CurrentComplexHead"
			style={{ backgroundImage: "url(" + bg + ")" }}
		>
			<div className="container">
				<span>{props.text1}</span>
				<span>{props.text2}</span>
			</div>
		</section>
	);
};

export default CurrentComplexHead;
