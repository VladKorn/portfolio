import React, { useState, useEffect } from "react";
import "./index.css";
import OrderButton from "../OrderButton/OrderButton";
// import Swal from "sweetalert2";

interface Props {
	isDisabled?: boolean;
	addToBasketHendler: AddToBasket;
	productId: number;
	value?: number;
	initial?: number;
	mode?: "instant";
	weekIndex: number;
}
const Swal = (window as any).Swal;

const Counter = (props: Props) => {
	const [count, setCount] = useState<number>(props.initial || 0);
	const showAlert = () => {
		Swal.fire({
			icon: "info",
			text: "товар на данный момент не доступен",
		});
	};
	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		if (props.isDisabled) {
			showAlert();
			return false;
		}
		const target = event.currentTarget;
		let value = parseInt(target.value);
		value = isNaN(value) ? 0 : value;
		setCount(value);
	};
	const decrementCount = () => {
		if (props.isDisabled) {
			showAlert();
			return false;
		}
		let value = count;
		// if(value === 'NaN' || value === ''){value = 0}
		let newValue = parseInt(value + "", 10) - 1;
		if (newValue !== -1) setCount(newValue);
	};
	const incrementCount = () => {
		if (props.isDisabled) {
			showAlert();
			return false;
		}
		let value = count;
		// if(value === 'NaN' || value=== ''){value = 0}
		let newValue = parseInt(value + "", 10) + 1;
		setCount(newValue);
	};
	useEffect(() => {
		if (props.mode === "instant") {
			props.addToBasketHendler(
				props.productId,
				count,
				props.weekIndex,
				false
			);
		}
	}, [count]);
	useEffect(() => {
		if (props.value) {
			setCount(props.value);
		}
	}, [props.value]);

	return (
		<>
			<span className="Couner Counter">
				<button onClick={decrementCount}>-</button>
				<input
					type="numbmer"
					value={count}
					onChange={handleInputChange}
				/>
				<button onClick={incrementCount}>+</button>
			</span>
			{props.mode === "instant" ? null : (
				<OrderButton
					addToBasketHendler={props.addToBasketHendler}
					productId={props.productId}
					isDisabled={props.isDisabled}
					isDisabledAlert={showAlert}
					quantity={count}
					weekIndex={props.weekIndex}
				/>
			)}
		</>
	);
};

export default Counter;
