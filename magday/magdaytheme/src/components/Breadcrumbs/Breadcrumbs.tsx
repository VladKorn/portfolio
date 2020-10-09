import React  from "react";
import "./index.css";
import { Link } from "react-router-dom";

interface Props {
	firstElem: any;
	thisElem: any;
}
const Breadcrumbs = (props: Props) => {
	return (
		<div className="Breadcrumbs">
			<Link className="Breadcrumbs--item" to={props.firstElem.link}>
				{props.firstElem.title}
			</Link>
			<span className="Breadcrumbs--item"> {props.thisElem} </span>
		</div>
	);
};
export default Breadcrumbs