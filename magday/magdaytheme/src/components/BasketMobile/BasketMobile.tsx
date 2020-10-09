import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Autorisation from "../Autorisation/Autorisation";

// import icoBasket from "../../images/ico-basket.png";

import "./index.css";
interface Props {
	products: Products;
	basketItems: BasketLocalItems;
	getProduct: any;
	link: string;
}
// const icoUserLogined = process.env.PUBLIC_URL+"/images/ico-userLogined.png";
const icoBasket = process.env.PUBLIC_URL+"/images/ico-basket.png";
// const icoUser = process.env.PUBLIC_URL+"/images/ico-user.png";

const BasketMobile = (props: Props) => {
	const [count, setCount] = useState(0);
	const totalPrice = () => {
		let totalPrice = 0;
		props.basketItems.forEach((_item) => {
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
	useEffect(() => {
		if (Object.keys(props.basketItems).length !== count) {
			setCount(Object.keys(props.basketItems).length);
		}
	} , [props.basketItems]);
	const tp = totalPrice()
	return (
		<Link className="BasketMobile" to={props.link}>
			<span className="Basket-ico ico-basket">
				<span
					className="Basket-ico ico-basket"
					style={{
						backgroundImage: "url(" + icoBasket + ")",
					}}
				></span>
			</span>
			<span>Корзина:</span>
			&ensp;
			{count === 0 ? (
				<>пуста</>
			) : (
				<>
					<span>
						<b className="color-accent3">
							{tp} руб.
						</b>
					</span>

					<span className="button gray to-order">
						Оформить <span className="hide-small">заказ</span>
					</span>
				</>
			)}
		</Link>
	);
};

export default BasketMobile;
