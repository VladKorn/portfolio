import React, { useState, useEffect } from "react";
import { Divider, Select, Button } from "antd";
import Products from "./../Products/Products";
import "./index.css";
const { Option } = Select;
interface Props {
	order: Order;
}

const OrderDatail = (props: Props) => {
	// console.log("JSON", JSON.stringify(props.order));
	const [status, setStatus] = useState<OrderStatus>(props.order.status);
	const [order, setOrder] = useState<Order>(props.order);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const [onChangeAnimation, setOnChangeAnimation] = useState<boolean>(false);
	function handleChange(value: any) {
		console.log(`selected ${value}`);
		setStatus(value);
	}
	useEffect(() => {
		// setStatus(props.order.status);
		if (props.order.id !== order.id) {
			setOrder(Object.assign({}, props.order));
			setStatus(props.order.status);
		} else {
			if (order.status !== props.order.status) {
				orderStatusIsChangedByUser();
				setStatus(props.order.status);
			}
		}
	}, [props.order]);
	const orderStatusIsChangedByUser = () => {
		console.log("orderStatusIsChangedByUser");
		setOnChangeAnimation(true);
	};
	useEffect(() => {
		if (onChangeAnimation) {
			const timer = setTimeout(() => {
				setOnChangeAnimation(false);
			}, 10000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [onChangeAnimation]);
	const onChangeProduct = (id: number, weekIndex: number, count: number) => {
		// console.log("onChangeProduct id weekIndex count", id, weekIndex, count);
		if (count > 0) {
			const products = [...order.items];
			const index = products.findIndex((item) => {
				return item.product_id === id && item.weekIndex === weekIndex;
			});
			products[index].quantity = count;
			order.items = products;
			setOrder(Object.assign({}, order));
		}
	};
	const addProduct = (value: Product) => {
		console.log("addProduct", value);
		//@ts-ignore
		order.items.push(value);
		setOrder(Object.assign({}, order));
	};
	const deleteProduct = (id: number, weekIndex: number) => {
		console.log("deleteProduct id weekIndex", id, weekIndex);
		const products = [...order.items].filter((item) => {
			return !(item.product_id === id && item.weekIndex === weekIndex);
		});

		order.items = products;
		setOrder(Object.assign({}, order));
	};
	const submit = () => {
		setSubmitLoading(true);
		const req: updateOrder = {
			action: "updateOrder",
			order: order,
		};
		fetch(`https://magday.ru/api/manager/`, {
			method: "post",
			body: JSON.stringify(req),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("updateOrder res", res);
				setOrder(res.order);
				setSubmitLoading(false);

				// return [res.orders, res.lastOrderId];
			})
			.catch((err) => {
				console.log("error", err);
				setSubmitLoading(false);
				alert(err);
			});
	};
	const className = `OrderDatail ${onChangeAnimation ? " onChangeAnimation": ""}`
	return (
		<section className={className}>
			<Divider orientation="left">Детали заказа # {order.id}</Divider>
			<div className="block">
				<ul>
					<li className="status">
						<span>Статус</span>
						<span>
							<Select
								defaultValue={status}
								value={status}
								style={{ width: 120 }}
								onChange={handleChange}
							>
								<Option value="pending">pending</Option>
								<Option value="processing">processing</Option>
								<Option value="on-hold">on-hold</Option>
								<Option value="completed">completed</Option>
								<Option value="cancelled">cancelled</Option>
								<Option value="refunded">refunded</Option>
							</Select>
						</span>
					</li>
					<li>
						<span>Способ оплаты</span>{" "}
						<span>{order.payment_method}</span>
					</li>

					<li>
						{/* <span>Состав заказа</span> */}
						{/* <span> */}
						<Products
							products={[...order.items]}
							onChangeProduct={onChangeProduct}
							deleteProduct={deleteProduct}
							addProduct={addProduct}
						/>
						{/* </span> */}
					</li>
					<li>
						<span>Адрес</span> <span>{order.address}</span>
					</li>
					<li>
						<span>Комментарии</span>{" "}
						<span>
							{order.comments.map((item, index) => (
								<p key={index}>
									{item.added_by} - {item.content}
								</p>
							))}
						</span>
					</li>

					<li>
						<span>ip</span> <span>{order.ip}</span>
					</li>
				</ul>
				<Button
					type="primary"
					// icon={<PoweroffOutlined />}
					loading={submitLoading}
					onClick={submit}
				>
					SAVE
				</Button>
			</div>
		</section>
	);
};

export default OrderDatail;
