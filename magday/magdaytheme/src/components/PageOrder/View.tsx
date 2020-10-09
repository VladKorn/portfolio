import React from "react";
import BasketList from "./../BasketList/BasketList";
import FormPayment from "./../FormPayment/FormPayment";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner"

interface Props {
	status: OrderStatus;
	statusText: string;
	id: number;
	items: BasketLocalItems;
	getProduct: any;
	products: Products;
	addToBasket: AddToBasket;
	isAuthorized: boolean;
	user: User|null;
}

const View = (props: Props) => {
	if(Object.keys(props.items).length === 0){
		return (
			<LoadingSpinner />
		)
	}
	return (
		<section id="page-order">
			<h2 className="section--title">
				Заказ № {props.id}: {props.statusText}{" "}
			</h2>
			<BasketList
				mode="default"
				items={props.items}
				getProduct={props.getProduct}
				products={props.products}
				addToBasket={props.addToBasket}
				isAuthorized={props.isAuthorized}
				user={props.user}
			/>
			{props.status === "pending" ? <FormPayment id={props.id} /> : null}
		</section>
	);
};

export default View;
