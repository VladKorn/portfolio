import React, { useState, useEffect } from "react";
import { orderRestUrl } from "../../xxxx.js";
import View from "./View";
import "./index.css";
interface Props {
	items: any;
	getProduct: any;
	products: Products;
	addToBasket: any;
	isAuthorized: boolean;
	user: User | null;
}
interface orderGetRes {
	error: string;
	id: number;
	success: boolean;
	status: OrderStatus;
	statusText: string;
	items: any;
}

const PageOrder = (props: Props) => {
	const [id, setId] = useState<number>(0);
	const [items, setItems] = useState([]);
	const [statusText, setStatusText] = useState<string>("pending");
	const [status, setStatus] = useState<OrderStatus>("pending");
	const url: string = window.location.pathname.split(`/order/`)[1];
	const formData: OrderRestApiGet = {
		type: "get",
		url: url,
	};

	const restartOrderData = () => {
		fetch(`${orderRestUrl}`, {
			// mode: 'no-cors',
			// headers: {'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'},
			method: "POST",
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((res: orderGetRes) => {
				console.log("order res", res);
				if (res.success) {
					setId(res.id);
					setStatusText(res.statusText);
					setStatus(res.status);
					setItems(res.items);
				} else {
					alert(`err ${res.error}`);
				}
			})
			.catch(function (error) {
				console.log("Request failed", error);
				alert("Request failed");
			});
	};
	useEffect(() => {
		restartOrderData()
		setInterval(restartOrderData, 15000);
	}, []);

	return (
		<View
			id={id}
			items={items}
			getProduct={props.getProduct}
			products={props.products}
			addToBasket={props.addToBasket}
			isAuthorized={props.isAuthorized}
			user={props.user}
			statusText={statusText}
			status={status}
		></View>
	);
};

export default PageOrder;
