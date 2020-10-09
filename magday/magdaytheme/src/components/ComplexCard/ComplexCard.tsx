import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Counter from "../Counter/Counter";

// import PersonsCount from "../PersonsCount/PersonsCount";

import "./index.css";

interface Props {
	addToBasketHendler: AddToBasket;
	productId: number;
	title: string;
	images: Array<any>;
	discount: number;
	price: number;
	isDisabled: boolean;
	isComplex: boolean;
	link: string;
	quantity: number;
	personsCount: number;
	tags: any;
	items: any;
	isPreorder: boolean;
	weekIndex: number;
}
// const weekday = DateTime.local().weekday;
const ComplexCard = (props: Props) => {
	const [images, setImages] = useState<Array<any>>();
	const [imgsCount, setImgsCount] = useState(0);
	const [priceOld, setOriceOld] = useState(0);
	const [priceDiscount, setPriceDiscount] = useState(0);
	// const [discountValue, setDiscountValue] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const setImagesFromProps = () => {
		if (Object.keys(props.images).length > 0) {
			let images: Array<any> = [];
			Object.keys(props.images).forEach((key: any) => {
				images.push(props.images[key]);
			});
			// console.log('images',images);
			setImages(images.slice(0, 6));
			setImgsCount(images.slice(0, 6).length);
		}
	};

	useEffect(() => {
		setImagesFromProps();
	}, [props.images]);
	useEffect(() => {
		const price = props.price;
		const discount = props.discount;
		let newPrice = 0;
		newPrice = price - (price / 100) * discount;
		// console.log('newPrice',newPrice , price ,discount);
		if (discount > 0) {
			setPriceDiscount(newPrice);
			setOriceOld(price);
		}
		if (props.items && Object.keys(props.items).length > 0) {
			// let images = [];
			// Object.keys(props.items).map(key =>{ images.push( props.items[key].img )});
			// // console.log('images',images);
			// setState({images : images.slice(0 ,6)});
			// setState({imgsCount :  images.slice(0 ,6).length });
		}
		setImagesFromProps();
	}, []);
	let innerListClassName = `inner-list`;
	if (!props.isComplex) {
		innerListClassName += ` isSimpleProduct`;
	}
	if (isOpen) {
		innerListClassName += ` isOpen`;
	}
	return (
		<article
			className="ComplexCard CatalogCard"
			data-disabled={props.isDisabled}
		>
			<div className="head">
				<Link
					to={
						props.isComplex
							? "/complex/" + props.link
							: "/product/" + props.link
					}
					// className="head"
				>
					{props.discount > 0 ? (
						<div className="ComplexCard--discountLabel">
							-{props.discount} %
						</div>
					) : (
						""
					)}

					<div className={"images-wrap" + " count" + imgsCount}>
						{imgsCount > 0
							? images?.map((item, index) => (
									<div className="img-wrap" key={index}>
										{item ? (
											<img src={item} alt="" />
										) : (
											<img
												className="no-image"
												src="https://magday.ru/wp-content/uploads/2018/08/img_no.png"
												alt=""
											/>
										)}
									</div>
							  ))
							: ""}
					</div>
					<span className="ComplexCard--title">{props.title}</span>
				</Link>
				<ul className={innerListClassName}>
					{props.isComplex ? (
						""
					) : props.items[0] ? (
						<b>Состав: </b>
					) : (
						""
					)}
					{props.items && imgsCount > 0
						? Object.keys(props.items).map((key, index) => (
								<li key={index}>
									<span className="inner-list--title">
										<a href={props.items[key].link}>
											{props.items[key].title}
										</a>
									</span>
									{props.items[key].weight ? (
										<span>{props.items[key].weight}гр</span>
									) : (
										""
									)}
									{props.items[key].quantity ? (
										<span>
											<b>
												{props.items[key].quantity} шт
											</b>
										</span>
									) : (
										""
									)}
									{props.isComplex ? "" : <i>,&nbsp;</i>}
								</li>
						  ))
						: ""}
					{Object.keys(props.items).length  > 3 && props.isComplex ? (
						<li
							key="more"
							className="more color-accent3"
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							И еще {Object.keys(props.items).length - 3} блюда
						</li>
					) : null}
				</ul>
			</div>
			<div className="price-info-wrap">
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

				{/* {props.discount ? <div className="discount-value">{discountValue} руб.</div> : ''} */}
				{/* {props.discount ? <div className="discount">Скидка {props.discount}%</div> : ''} */}
				<div className="price-wrap">
					<div className="price">
						{priceOld ? priceDiscount.toFixed(0) : props.price}
						руб.
					</div>
					{/* <PersonsCount count={props.personsCount} /> */}
				</div>
				{props.isPreorder ? (
					<div className="preorder">
						<span>По предзаказу</span>
						<span>за 24 часа</span>
					</div>
				) : null}
			</div>
			<div className="ComplexCard--order-wrap">
				{props.isDisabled ? (
					"Временно не доступно"
				) : (
					<Counter
						isDisabled={props.isDisabled}
						value={props.quantity||1}
						addToBasketHendler={props.addToBasketHendler}
						productId={props.productId}
						weekIndex={props.weekIndex}
					/>
				)}
			</div>
			<ul className="ComplexCard--tags tags">
				{props.tags
					? props.tags.map((item: any, index: number) => (
							<li className="item" key={index}>
								#{item.name}
							</li>
					  ))
					: ""}
			</ul>
		</article>
	);
};

export default ComplexCard;
