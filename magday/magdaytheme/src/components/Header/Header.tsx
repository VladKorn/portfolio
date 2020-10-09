import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import logo from "../../images/logo.png";
import Basket from "../Basket/Basket";
// import Nav from '../Nav/Nav';
import NavByPages from "../NavByPages/NavByPages";
// import NavByCategory from "../NavByCategory/NavByCategory";
// import NavByWeek from "../NavByWeek/NavByWeek";
import Autorisation from "../Autorisation/Autorisation";

// import icoUser from "../../images/ico-user.png";
// import icoUserLogined from "../../images/ico-userLogined.png";

import "./index.css";

interface Props {
	setUser: any;
	slogan: string;
	menuPrimary: any;
	phone: string;
	user: any;
	isAuthorized: boolean;
	products: Products;
	getProduct: any;
	basketItems: any;
	setAsideIsOpen: (value: boolean) => void;
	logout: any;
	setCallbackIsOpen: (value: boolean) => void;
}
const logo = process.env.PUBLIC_URL + "/images/logo.png";

const icoUserLogined = process.env.PUBLIC_URL + "/images/ico-userLogined.png";
// const icoBasket = process.env.PUBLIC_URL+"/images/ico-basket.png";
const icoUser = process.env.PUBLIC_URL + "/images/ico-user.png";

const Header = (props: Props) => {
	const history = useHistory();

	const [isFixed, setIsFixed] = useState(false);
	const [height, setHeight] = useState(100);
	// const [totalPrice, setTotalPrice] = useState(0);
	// const [totalCount, setTotalCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [autorisationIsOpen, setAutorisationIsOpen] = useState(false);

	const AutorisationToggle = () => {
		setAutorisationIsOpen(!autorisationIsOpen);
	};
	const setDataFromBasket = (totalPrice: number, totalCount: number) => {
		// setTotalPrice(totalPrice);
		// setTotalCount(totalCount);
	};
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};
	const elHeader = document.querySelector<HTMLElement>("header");
	useEffect(() => {
		if (elHeader) {
			setTimeout(() => {
				console.log("elHeader", elHeader, elHeader.offsetHeight);
				setHeight(elHeader.offsetHeight);
			}, 300);
		}
		// console.log(elHeader.offsetHeight)
		document.addEventListener("scroll", (event) => {
			if (window.pageYOffset > 400) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		});
	}, []);
	useEffect(() => {
		if (elHeader && height !== elHeader.offsetHeight && !isFixed) {
			setHeight(elHeader.offsetHeight);
		}
	});

	const clickHandler = () => {
		if (props.user) {
			// window.location.pathname = 'user'
			history.push("/user");
		} else {
			setAutorisationIsOpen(true);
		}
	};

	return (
		<>
			<Autorisation
				isOpen={autorisationIsOpen}
				AutorisationToggle={AutorisationToggle}
				setUser={props.setUser}
			/>
			{isFixed ? (
				<div
					className="Header--replacment"
					style={{ height: height }}
				></div>
			) : (
				""
			)}
			<header
				className={
					"Header " +
					(isFixed ? " isFixed " : "") +
					(isOpen ? " isOpen " : "")
				}
			>
				<div className="container container-top">
					{/* <div className="header-first-line"> */}
					<Link to="/" className="logo-wrap">
						<img src={logo} alt="" />
						{isFixed ? "" : <span>{props.slogan}</span>}
					</Link>
					<div className="hide-large logo-side">
						{props.isAuthorized ? (
							<span
								onClick={clickHandler}
								className="Basket-ico ico-user"
								style={{
									backgroundImage:
										"url(" + icoUserLogined + ")",
								}}
							></span>
						) : (
							<span
								onClick={clickHandler}
								className="Basket-ico ico-user"
								style={{
									backgroundImage: "url(" + icoUser + ")",
								}}
							></span>
						)}
						<div className="header-toggle-wrap">
							<div
								className="nav-ico"
								onClick={() => {
									props.setAsideIsOpen(true);
								}}
							>
								<i></i>
								<i></i>
								<i></i>
							</div>
						</div>
					</div>
					{/* </div> */}

					<NavByPages
						className="hide-small"
						items={props.menuPrimary}
					/>

					{/* <Nav 
				
				/> */}

					<div className="header--phone">
						{isFixed ? "" : <p>Бесплатная доставка</p>}
						{props.phone ? (
							<a
								href={"tel:+" + props.phone.replace(/\D+/g, "")}
								dangerouslySetInnerHTML={{
									__html: props.phone,
								}}
							/>
						) : (
							""
						)}
						<button
							className="link"
							onClick={() => {
								props.setCallbackIsOpen(true);
							}}
						>
							Перезвоните мне
						</button>
					</div>
					<div className="Header--mob-buttons-wrap">
						{/* <Link to="/basket" className="mini-basket">
							<div className="mini-basket--count">
								{totalCount}
							</div>
							<div className="mini-basket--price">
								{totalPrice + " р."}{" "}
							</div>
						</Link> */}
						{/* <div className="header-toggle-wrap">
							<div className="nav-ico" onClick={toggleIsOpen}>
								<i></i>
								<i></i>
								<i></i>
							</div>
						</div> */}
					</div>
					<Basket
						logout={props.logout}
						openSingIn={() => {
							setAutorisationIsOpen(true);
						}}
						isAuthorized={props.isAuthorized}
						user={props.user}
						// isFixed={isFixed}

						products={props.products}
						getProduct={props.getProduct}
						basketItems={props.basketItems}
						link="/basket"
						setDataFromBasket={setDataFromBasket}
					/>
				</div>
				{/* {isFixed ? 
				<div className="Header-second-line">
					<div className="container">
					<NavByWeek
						weekIndex={props.weekIndex}
						DateTime={props.DateTime} 
						clickHandler={props.clickHandler}
						mode='compact'
					/>
					<NavByCategory 
						items={props.categories}
					/>
					</div>

				</div>
			:''} */}
			</header>
		</>
	);
};

export default Header;
