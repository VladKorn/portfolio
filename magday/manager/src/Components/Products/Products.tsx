import React, { useState } from "react";
import { Button, InputNumber, Form } from "antd";
import { DeleteFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import InputSearch from "./../InputSearch/InputSearch";

import "./index.css";

interface Props {
	products: Products;
	onChangeProduct: (id: number, weekIndex: number, count: number) => void;
	deleteProduct: (id: number, weekIndex: number) => void;
	addProduct: (x:Product)=>void;
}

const Products = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="Products">
			{
				// @ts-ignore
				props.products.map((item: Product) => (
					<div
						key={item.product_id + "_" + item.weekIndex}
						className="item"
					>
						<span className="cell">
							# {item.product_id}_{item.weekIndex}{" "}
						</span>
						<span className="cell name">{item.name} </span>
						<span className="cell">
							<InputNumber
								min={1}
								defaultValue={item.quantity}
								onChange={(value) => {
									const val = value as number;
									props.onChangeProduct(
										item.product_id,
										item.weekIndex,
										val
									);
								}}
							/>
						</span>
						<span className="cell total">
							{/* {item.subtotal} {item.currency} */}
							{item.price * item.quantity} {item.currency}
						</span>
						<span className="cell">
							<Button
								onClick={() => {
									props.deleteProduct(
										item.product_id,
										item.weekIndex
									);
								}}
							>
								<DeleteFilled />
							</Button>
						</span>
					</div>
				))
			}
			{isOpen && <Add setIsOpen={setIsOpen} addProduct={props.addProduct} />}
			{!isOpen && (
				<Button
					onClick={() => {
						setIsOpen(true);
					}}
				>
					Добавить
				</Button>
			)}
		</section>
	);
};

export default Products;
interface AddProps {
	setIsOpen: any;
	addProduct: (x:Product)=>void;
}
const Add = (props: AddProps) => {
	const [product, setProduct] = useState<any | null>(null);
	const onFinish = (values: any) => {
		const prod: Product = {
			name: product.name,
			product_id: product.id,
			quantity: values.quantity,
			weekIndex: values.weekIndex,
			subtotal: 0,
			price: 0,
			billing: "",
			currency: "RUB",
		};
		props.addProduct(prod);
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const addToProducts = () => {};
	return (
		<div className="Products--Add">
			<div className="Products--Add-id">
				# {product ? product.id : "___"}
			</div>
			<Form
				layout={"inline"}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					name="weekIndex"
					rules={[
						{
							required: true,
							message: "Индекс дня недели (1-7) ",
						},
					]}
				>
					<InputNumber placeholder="день недели" min={1} max={7} />
				</Form.Item>
				<InputSearch setProduct={setProduct} />
				{/* <Input placeholder="товар" /> */}
				<Form.Item
					name="quantity"
					rules={[
						{
							required: true,
							message: "количество довара в заказе",
						},
					]}
				>
					<InputNumber placeholder="кол-во" min={1} />
				</Form.Item>

				<Button htmlType="submit" type="primary">
					<CheckOutlined />
				</Button>
				<Button
					onClick={() => {
						props.setIsOpen(false);
					}}
				>
					<CloseOutlined />
				</Button>
			</Form>
		</div>
	);
};
