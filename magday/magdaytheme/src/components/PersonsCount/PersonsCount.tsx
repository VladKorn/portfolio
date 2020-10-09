import React from "react";
import "./index.css";
interface Props {
	count: number;
}
const PersonsCount = (props: Props) => {
	return (
		<span className="PersonsCount">
			{[1, 2, 3, 4, 5, 6].map((item) => (
				<div
					key={item}
					className="item"
					data-isenable={item <= props.count ? "true" : "false"}
				></div>
			))}
		</span>
	);
};
export default PersonsCount
