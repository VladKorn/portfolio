import React, { useState } from "react";
import BasketList from "../BasketList/BasketList";
import OrderForm from "../OrderForm/OrderForm";

interface Props {
	items: BasketLocalItems;
	getProduct: any;
	products: Products;
	addToBasket: AddToBasket;
	isAuthorized: boolean;
	user: User|null;
}

const PageBasket = (props: Props) => {
	const [step, setStep] = useState(1);
	if (!(Object.keys(props.items).length > 0)) {
		return (
			<h2
				style={{
					textAlign: "center",
					marginBottom: "10rem",
				}}
			>
				Ваша конзина пуста
			</h2>
		);
	}
	if (step === 1) {
		return (
			<>
			<h2 className="section--title">Ваша корзина:</h2>

				<BasketList
					mode="mutable"
					items={props.items}
					getProduct={props.getProduct}
					products={props.products}
					addToBasket={props.addToBasket}
					isAuthorized={props.isAuthorized}
					user={props.user}
				/>
				<div className="button-wrap">
				<button
					className="button gray big"
					onClick={() => {
						setStep(2);
					}}
				>
					Далее
				</button>
				</div>
			</>
		);
	}
	if (step === 2) {
		return (
			<OrderForm
				basketItems={props.items}
				isAuthorized={props.isAuthorized}
				user={props.user}
			/>
		);
	}
	return <></>;
};

export default PageBasket;
