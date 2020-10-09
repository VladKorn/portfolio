import React, { useState, useEffect } from "react";
import PersonsCount from "../PersonsCount/PersonsCount";
import Counter from "../Counter/Counter";
// import ComplexCardContainer from "../ComplexCard/ComplexCardContainer";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

import "./index.css";

interface Props {
	items: Products;
	personsCount: number;
	discount: number;
	price: number;
	breadcrumbs: any;
	title: string;
	addToBasketHendler: AddToBasket;
	productId: number;
	weekIndex: number;
}

const ComplexDetail = (props: Props) => {
	// const [quantity, setQuantity] = useState<number>(0);
	const [totalWeight, setTotalWeight] = useState<number>(0);
	const [totalWeightOnPerson, setTotalWeightOnPerson] = useState<number>(0);
	const [totalCaloricity, setTotalCaloricity] = useState<number>(0);
	const [totalCaloricityOnPerson, setTotalCaloricityOnPerson] = useState<
		number
	>(0);
	const [priceOld, setPriceOld] = useState<number>(0);
	const [priceDiscount, setPriceDiscount] = useState<number>(0);
	useEffect(() => {
		Object.keys(props.items).forEach((itemId: any, index) => {
			let itemWeight = props.items[itemId].weight;
			let itemCaloricity = props.items[itemId].caloricity;
			// console.log('itemWeight', itemWeight);
			if (itemWeight) {
				let newWeight = parseInt(totalWeight + "", 10) + itemWeight;
				// this.setState({ totalWeight: newWeight });
				setTotalWeight(newWeight);
				// this.setState({
				// 	totalWeightOnPerson: (
				// 		totalWeight / props.personsCount
				// 	).toFixed(0),
				// });
				setTotalWeightOnPerson(
					parseInt((totalWeight / props.personsCount).toFixed(0))
				);
			}
			if (itemCaloricity) {
				let newCaloricity =
					parseInt(totalCaloricity + "", 10) +
					parseInt(itemCaloricity + "", 10);
				// this.setState({ totalCaloricity: newCaloricity });
				setTotalCaloricity(newCaloricity);
				// this.setState({
				// 	totalCaloricityOnPerson: (
				// 		totalCaloricity / props.personsCount
				// 	).toFixed(0),
				// });
				setTotalCaloricityOnPerson(
					parseInt((totalCaloricity / props.personsCount).toFixed(0))
				);
			}
		});
	}, [props]);
	useEffect(() => {
		const price = props.price;
		const discount = props.discount;
		let newPrice = 0;
		newPrice = price - (price / 100) * discount;
		console.log("newPrice", newPrice, price, discount);
		if (discount > 0) {
			// this.setState({ priceDiscount: newPrice });
			setPriceDiscount(newPrice);
			// this.setState({ priceOld: price });
			setPriceOld(price);
		}
	}, [props.price, props.discount]);

	return (
		<section className="ComplexDetail container">
			<div className="breadcrumbs">
				<Breadcrumbs
					firstElem={props.breadcrumbs}
					thisElem={props.title}
				/>
			</div>
			<div className="inner-propucts">
				{Object.keys(props.items).map((itemId: any, index) => {
					const _item = props.items[itemId];
					return (
						<div className="item" key={index}>
							<img src={_item.img || ""} alt={_item.name} />
							<h2 className="inner-propucts--item-title">
								{_item.name}
							</h2>
							<div className="inner-propucts--info">
								[ {_item.weight ? _item.weight + " гр" : ""}
								{_item.caloricity
									? "; " + _item.caloricity + " ккал."
									: ""}
								]
							</div>
							<hr />
							<div className="inner-propucts--description">
								<b>Состав: </b>
								<br />
								<div
									dangerouslySetInnerHTML={{
										__html: _item.shortDescription,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="ComplexDetail--info-wrap">
				<h1 className="ComplexDetail--title">
					Комплект <br />
					<span>«{props.title}»</span>
				</h1>
				{props.discount > 0 ? (
					<div className="ComplexCard--discountLabel">
						-{props.discount} %
					</div>
				) : (
					""
				)}
				<ul className="ComplexDetail--info-list">
					<li>
						Количество персон{" "}
						<span>
							<b className="PersonsCount_text">
								{props.personsCount}
							</b>{" "}
							<PersonsCount count={props.personsCount} />
						</span>
					</li>
					<li>
						Общий вес на 1 персону:{" "}
						<span>
							{" "}
							<b>
								[ {totalWeightOnPerson} гр;{" "}
								{totalCaloricityOnPerson} ккал ]
							</b>
						</span>
					</li>
					<li>
						Общий вес:
						<span>
							<b>
								[ {totalWeight} гр; {totalCaloricity} ккал ]
							</b>
						</span>
					</li>
				</ul>

				<br />
				{priceOld ? (
					<div className="old-price">{priceOld} руб. </div>
				) : (
					""
				)}
				{priceOld ? (
					<div className="discount">Скидка {props.discount} %</div>
				) : (
					""
				)}
				{priceOld ? (
					<div className="price">{priceDiscount} руб.</div>
				) : (
					<div className="price">{props.price} руб.</div>
				)}

				<Counter
					value={0}
					addToBasketHendler={props.addToBasketHendler}
					productId={props.productId}
					weekIndex={props.weekIndex}
				/>
			</div>
			<hr />
			<h3 className="title-inner">Похожие комплекты</h3>
			{/* <ComplexCardContainer 
						addToBasketHendler={props.addToBasketHendler}
						basketItems={props.basketItems}
						// weekIndex={weekIndex}
						// dayPartIndex='1'
						// category=''
					/> */}
		</section>
	);
};
export default ComplexDetail;
