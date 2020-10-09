import React from "react";
import "./index.css";
interface Props {
	title: string;
	items: any;
}
const OurCients = (props: Props) => {
	return (
		<section className="OurCients container">
			<span className="section--title">{props.title}</span>
			<div className="OurCients--items-wrap">
				{props.items
					? props.items.map((item: any, index: number) => (
							<div className="item" key={index}>
								<img src={item.img} alt="" />
							</div>
					  ))
					: ""}
			</div>
		</section>
	);
};
export default OurCients;
