import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Counter from "../Counter/Counter";
import { DateTime } from "luxon";

import { weekItems } from "./../../xxxx";

import "./index.css";

interface Props {
	mode: "mutable" | "default";
	items: BasketLocalItems;
	getProduct: any;
	products: Products;
	addToBasket: AddToBasket;
	isAuthorized: boolean;
	user: User | null;
}

const initialWeekday = DateTime.local().weekday;
console.clear();
console.log("initialWeekday" , initialWeekday)
const BasketList = (props: Props) => {
	const [items, setItems] = useState<BasketItems>(null);
	const [productsLength, setProductsLength] = useState(0);

	const setList = () => {
		// console.log("setList", props.products);
		let data: BasketItems = [];
		const products: Products = props.products;
		if (props.items) {
			// console.log("setList items", props.items);

			props.items.forEach((_item) => {
				props.getProduct(_item.id);
				const product = products[_item.id];
				console.log("product", product);
				if (product) {
					let isComplex = product.isComplex;
					let item = _item;
					// console.log("initItem" , item)
					const basketitem: BasketItem = {
						id: _item.id,
						quantity: item.quantity,
						isComplex: isComplex,
						title: product.name,
						img:
							product.img ||
							`https://magday.ru/wp-content/uploads/2018/08/img_no.png`,
						price: parseInt(product.price.toFixed(0)),
						link: "/product/" + product.slug,
						weight: product.weight,
						description: product.composition,
						weekIndex: item.weekIndex,
						// personsCount: product.acf.persons_count,
					};

					if (isComplex) {
						// data[itemId].price =product.acf.complex_price;
						// data[itemId].img =
						// 	product.acf.complex[0].complex_img.url;
						basketitem.description = [];
						basketitem.link = "/complex/" + product.slug;
					}
					console.log("basketitem", basketitem);

					data?.push(basketitem);
				}
			});
		}
		// console.log("setList data", data);

		setItems(data);
	};

	useEffect(() => {
		if (Object.keys(props.products).length > productsLength) {
			setProductsLength(Object.keys(props.products).length);
			setList();
		}
	});
	useEffect(() => {
		// console.log(
		// 	"useEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffect"
		// );
		setList();
	}, [props.items]);

	useEffect(() => {
		console.log("useEffect moutn");
		setList();
	}, []);
	if (!items) {
		return <p>Корзина пуста </p>;
	}
	const totalPrice = () => {
		let totalPrice = 0;
		items.forEach((_item) => {
			let item = _item;
			let prodCount = item.quantity;
			let prodPrice = 0;
			let prodPriceTotal = 0;
			if (props.products[_item.id]) {
				prodPrice = props.products[_item.id].price;
				prodPriceTotal = prodPrice * prodCount;
				// console.log('this.props.products[key].price',this.props.products[key].price)
			} else {
				props.getProduct(_item.id);
			}
			// totalCount = totalCount + prodCount;
			totalPrice = totalPrice + prodPriceTotal;
			// this.setState({ count: totalCount });
			// this.setState({ totalPrice: totalPrice });
			// return totalPrice;
		});
		return totalPrice;
	};
	const className = `BasketList container ${props.mode}`;

	const renderCats = () => {
		let cats: any = [];
		let firstDayDateTime = DateTime.local().minus({
			days: initialWeekday - 1,
		});
		for (let index = 0; index < 7; index++) {
			// if (!_items.includes(item.weekIndex)) {
			const date = firstDayDateTime.plus({ days: index });
			const dateFormat = date.toFormat("dd LL").replace(" ", ".");
			const innerItems: BasketItems = items.filter((_item) => {
				return _item.weekIndex === date.weekday;
			});
			console.log("innerItems", innerItems, index);
			if (innerItems.length > 0) {
				cats.push({
					dateFormat: dateFormat,
					weekIndex: date.weekday,
					innerItems: innerItems,
					weekName: weekItems[date.weekday - 1],
				});
			}

			// _items.push(item.weekIndex);
			// }
		}
		return cats.map((cat: any, index: number) => {
			return (
				<React.Fragment key={index}>
					<span className="BasketList--title Catalog--category-title">
						<span>
							{cat.weekName} {cat.dateFormat}
						</span>
					</span>
					<ul>
						{cat.innerItems.map((__item: any) => (
							<Item
								key={__item.id + __item.weekIndex}
								itemId={__item.id}
								item={__item}
								mode={props.mode}
								addToBasket={props.addToBasket}
							></Item>
						))}
					</ul>
				</React.Fragment>
			);
		});
	};
	const cats = renderCats();
	return (
		<div className={className}>
			{cats}
			<div className="total-price">Всего: {totalPrice()} руб.</div>
			{/* <Link to='order'>Перейти к оформлению заказа</Link> */}
		</div>
	);
};

export default BasketList;

interface ItemProps {
	itemId: number;
	item: BasketItem;
	mode: "mutable" | "default";
	addToBasket: AddToBasket;
}
const Item = (props: ItemProps) => {
	const { item, mode } = props;
	console.log("item.composition" , item.description);

	return (
		<li className="BasketList--item">
			<div className="BasketList--item-imgwrap">
				<img src={item.img || ""} alt="" />
			</div>
			<div className="BasketList--item-title-wrap">
				<Link to={item.link} className="BasketList--item-title">
					<h4>{item.title}</h4>
				</Link>

				{item.description?.length ? (
					<div className="">
						{item.description.map((item: any, index: number) => (
							<span key={index}>{item}, </span>
						))}
					</div>
				) : null}
				<div className="BasketList--item-weight-wrap">
					<span>
						Вес: {item.weight} кг.
						{/* ( {item.price} руб. x {item.quantity} ед. ) */}
					</span>{" "}
				</div>
			</div>
			<div className="BasketList--item-price-wrap">
				<span>
					Цена: <b>{item.price} Руб.</b>
				</span>
			</div>
			<div className="BasketList--item-Counter-wrap">
				{mode === "mutable" ? (
					<Counter
						initial={item.quantity}
						mode="instant"
						addToBasketHendler={props.addToBasket}
						productId={props.itemId}
						weekIndex={item.weekIndex}
					/>
				) : null}
			</div>
			<div className="BasketList--item-total-item-price">
				<span>
					Сумма: <b>{item.price * item.quantity} Руб.</b>
				</span>
			</div>
			<div className="">
				<div className="delete">
					<button
						type="button"
						title="Удалить"
						onClick={() => {
							props.addToBasket(
								props.itemId,
								0,
								item.weekIndex,
								false
							);
						}}
					>
						<svg
							className="MuiSvgIcon-root jss181 jss185"
							focusable="false"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
						</svg>
					</button>
				</div>
			</div>
			{/* <div className="BasketList--item-bottom-wrap">
				<div className="BasketList--item-count-wrap">
					кол-во: {item.quantity} ед.
					{item.isComplex
						? `  ( ${item.personsCount} x ${item.quantity} )
							Всего на ${item.personsCount * item.quantity} персон`
						: ""}
				</div>
			</div> */}
		</li>
	);
};
