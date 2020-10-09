import React from "react";
// import Swal from "sweetalert2";

interface Props {
	addToBasketHendler: AddToBasket;
	productId: number;
	quantity: number;
	isDisabled?: boolean;
	isDisabledAlert: any;
	weekIndex: number;
}
// const Swal = (window as any).Swal;

const OrderButton = (props: Props) => {
	const addToBasket = () => {
		if (props.isDisabled) {
			props.isDisabledAlert();
			return false;
		}
		let quantity = props.quantity;
		// console.log("quantity", props.quantity, quantity);
		props.addToBasketHendler(props.productId, quantity , props.weekIndex);
	};
	return (
		<div>
			<button onClick={addToBasket} className="button gray">
				Заказать 
				{/* {props.weekIndex} */}
			</button>
			{/* {this.props.quantity} <br/>	 */}
			{/* {this.props.productId} */}
		</div>
	);
};

export default OrderButton;

