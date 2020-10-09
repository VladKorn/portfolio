import React from "react";
import "./index.css";
// import PersonsCount from "../PersonsCount/PersonsCount";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

import Counter from "../Counter/Counter";
interface Props {
	img: string | false;
	breadcrumbs: any;
	title: string;
	totalCaloricity: string;
	totalWeight: number;
	excerpt: any;
	tags: Array<any>;
	productId: number;
	addToBasketHendler: AddToBasket;
	price: number;
	weekIndex: number;
}
const ProductDetail = (props: Props) => {
	return (
		<section className="ProductDetail container">
			<Breadcrumbs
				firstElem={props.breadcrumbs}
				thisElem={props.title}
				// items={props.breadcrumbs}
			/>
			<div className="wrap">
				<div className="ProductDetail--img">
					{props.img === "false" ? (
						<img
							className="no-image"
							src="https://magday.ru/wp-content/uploads/2018/08/img_no.png"
							alt=""
						/>
					) : (
						<img src={props.img + ""} alt={props.title} />
					)}
				</div>
				<div className="ProductDetail--info-wrap">
					<h1 className="ProductDetail--title">{props.title}</h1>
					<div className="ComplexDetail--first-wrap">
						<ul className="ComplexDetail--info-list">
							{/* <li>
							Количество персон{" "}
							<span>
								<b className="PersonsCount_text">1</b>{" "}
								<PersonsCount count={1} />
							</span>
						</li> */}
							{/* <li>Общий вес на 1 персону: <span> <b>[ {this.state.totalWeightOnPerson} гр; {this.state.totalCaloricityOnPerson} ккал ]</b></span></li> */}
							<li>
								Общий вес:
								<span>
									<b>
										[ {props.totalWeight} гр;{" "}
										{props.totalCaloricity} ккал ]
									</b>
								</span>
							</li>
						</ul>
						{props.excerpt ? (
							<div
								className="excerpt"
								dangerouslySetInnerHTML={{
									__html: props.excerpt,
								}}
							/>
						) : (
							""
						)}
					</div>
					<div className="ProductDetail--order-data-wrap">
						<div className="price">{props.price} руб.</div>
						<div className="ProductDetail--Counter-wrap">
							<hr />
							<Counter
								value={1}
								productId={props.productId}
								addToBasketHendler={props.addToBasketHendler}
								weekIndex={props.weekIndex}
							/>

							<hr />
						</div>
					</div>
					{props.tags ? (
						<ul className="tags">
							{props.tags.map((item, index) => (
								<li key={index}>#{item.title}</li>
							))}
						</ul>
					) : (
						""
					)}
				</div>
			</div>
		</section>
	);
};

export default ProductDetail;
