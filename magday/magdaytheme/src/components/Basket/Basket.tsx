import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// import Autorisation from "../Autorisation/Autorisation";

// import icoBasket from "../../images/ico-basket.png";
// import icoPlate from "../../images/ico-plate.png";
// import icoUser from "../../images/ico-user.png";
// import icoUserLogined from "../../images/ico-userLogined.png";


import "./index.css";
interface Props {
	openSingIn: () => void;
	logout: any;
	products: Products;
	basketItems: BasketLocalItems;
	getProduct: any;
	setDataFromBasket: any;
	isAuthorized: boolean;
	link: string;
	user: User | null;
}
const icoUserLogined = process.env.PUBLIC_URL+"/images/ico-userLogined.png";
const icoBasket = process.env.PUBLIC_URL+"/images/ico-basket.png";
// const icoUser = process.env.PUBLIC_URL+"/images/ico-user.png";


const Basket = (props: Props) => {
	const history = useHistory();

	const [count, setCount] = useState(0);
	// const [totalCount, setTotalCount] = useState(0);
	// const [totalPrice, setTotalPrice] = useState(0);
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
	});
	const clickHandler = () => {
		if (props.user) {
			// window.location.pathname = 'user'
			history.push("/user");
		} else {
			props.openSingIn();
		}
	};

	return (
		<div className="Basket hide-small">
			<div className="Basket-row first hide-small">
				{props.user ? (
					<>
						<span className="user-name-wrap">
							<span
								onClick={clickHandler}
								className="Basket-ico ico-user"
								style={{
									backgroundImage:
										"url(" + icoUserLogined + ")",
								}}
							></span>
							<b className="Basket--user-name">
								{props.user.name}
							</b>
							<span className="Basket--discount">
								{props.user.discount || 0}%
							</span>
						</span>

						<Link className="Basket--link profile" to="/user">
							Личный кабинет
						</Link>
						<Link
							className="Basket--link second"
							to="/OrderHistory"
						>
							История заказов
						</Link>
						<div
							className="Basket--link link exit"
							onClick={props.logout}
						>
							Выход
						</div>
					</>
				) : (
					<>
						<span className="Basket-row--center">
							<span
								onClick={clickHandler}
								className="Basket-ico ico-user"
								style={{
									backgroundImage:
										"url(" + icoUserLogined + ")",
								}}
							></span>
							<span className="login link" onClick={clickHandler}>
								Вход
							</span>
							{/* <Link to='SignUp'> Регистрация </Link> */}
						</span>
						{/* <img className='ico-plate' src={icoPlate} alt=""/> */}
					</>
				)}
			</div>

			{/* <hr /> */}
			<div className="Basket-row second">
				<Link to={props.link} className="Basket-ico ico-basket">
					<span
						className="Basket-ico ico-basket"
						style={{
							backgroundImage: "url(" + icoBasket + ")",
						}}
					></span>
				</Link>
				<Link to={props.link}>Корзина:</Link>
				&ensp;
				{count === 0 ? (
					<>пуста</>
				) : (
					<>
						{/* <Link to={props.link}>
								{count} товаров
							</Link> */}
						<span>
							<b className="color-accent3">
								<Link to={props.link}>{totalPrice()} руб.</Link>
							</b>
						</span>

						<Link to={props.link} className="button gray to-order">
							Оформить <span className="hide-small">заказ</span>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Basket;
