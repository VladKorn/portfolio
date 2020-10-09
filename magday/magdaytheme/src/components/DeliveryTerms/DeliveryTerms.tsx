import React from "react";
import "./index.css";
interface Props {
	items1: any;
	items2: any;
	items3: any;
}

const DeliveryTerms = (props: Props) => {
	return (
		<section className="DeliveryTerms">
			<span className="section--title">Условия доставки:</span>
			<div className="container">
				{props.items1 ? (
					<ul className="items1 line-list">
						{props.items1.map((item: any, index: number) => (
							<li key={index}>{item.item}</li>
						))}
					</ul>
				) : (
					""
				)}
				{props.items2 ? (
					<ul className="items2 line-list line-list--color2">
						{props.items2.map((item: any, index: number) => (
							<li key={index}>{item.item}</li>
						))}
					</ul>
				) : (
					""
				)}
				{props.items3 ? (
					<ul className="items3 line-list line-list--color3">
						{props.items3.map((item: any, index: number) => (
							<li key={index}>{item.item}</li>
						))}
					</ul>
				) : (
					""
				)}
			</div>
		</section>
	);
};

export default DeliveryTerms