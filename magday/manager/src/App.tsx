import React, { useState, useEffect } from "react";
import { Button, Divider, Table } from "antd";
import { PrinterFilled } from "@ant-design/icons";
// import OrderItem from "./Components/OrderItem/OrderItem";
import OrderDetail from "./Components/OrderDetail/OrderDetail";
import UserDetail from "./Components/UserDetail/UserDetail";

import UIfx from "uifx";
import "antd/dist/antd.css";

import "./App.css";
// const tickAudio =  require('./sounds/when.mp3');
// const tickAudio =  require('./sounds/Button_alert_tone.mp3');
const tickAudio = require("./sounds/short_notification.mp3");
// const tickAudio =  require('./sounds/intuition.mp3');
const tick = new UIfx(tickAudio);
const newOrderNotification = () => {
	console.log("newOrderNotification");
	tick.play();
};

const columns = [
	{ title: "id", dataIndex: "id", key: "id" },
	{ title: "date", dataIndex: "date", key: "date" },
	{ title: "total", dataIndex: "total", key: "total" },
	{ title: "email", dataIndex: "email", key: "email" },
	{ title: "phone", dataIndex: "phone", key: "phone" },
];
interface checksInner {
	[key: number]: Orders;
}
function App() {
	const [orders, setOrders] = useState<Orders>([]);
	const [activeOrderId, setActiveOrderId] = useState<number>(801);
	const [activeOrder, setActiveOrder] = useState<Order | null>(null);
	const [checks, setChecks] = useState<Orders>([]);
	const [checksInner, setChecksInner] = useState<checksInner>({});

	const expandedRowRender = (record: Order) => {
		return (
			<Table
				rowKey="id"
				size="small"
				rowClassName={(record) => {
					return record.id === activeOrderId ? "isActive" : "";
				}}
				columns={columns}
				dataSource={record.prevOrders}
				pagination={false}
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							console.log(
								"setActiveOrderId record.id",
								record.id
							);

							setActiveOrderId(record.id);
							setActiveOrder(Object.assign({}, record));
						},
					};
				}}
				rowSelection={{
					type: "checkbox",
					onChange: (keys, rows) => {
						console.log("keys rows", keys, rows, record);
						const data = checksInner;
						//@ts-ignore
						data[record.id] = keys;
						setChecksInner(Object.assign({}, data));
					},
				}}
				// expandable={{
				// 	expandedRowRender: record => <p style={{ margin: 0 }}></p>,
				// 	rowExpandable: record => true
				//   }}
			/>
		);
	};

	const fetchOrders = async () => {
		const req: OrdersGet = {
			action: "getOrders",
			activeOrderId: activeOrderId,
		};
		return await fetch(`https://magday.ru/api/manager/`, {
			method: "post",
			body: JSON.stringify(req),
		})
			.then((res) => res.json())
			.then((res: OrdersRes) => {
				console.log("fetchOrders res", res);
				return [res.orders, res.lastOrderId] as [Orders, number];
			});
	};
	const checkOrders = async () => {
		const [_orders, lastOrderId]: [Orders, number] = await fetchOrders();
		// console.log("checkOrders orders", orders);
		if (orders.length === 0) {
			return _orders;
		} else {
			//is heve new items
			if (orders[0].id !== lastOrderId) {
				newOrderNotification();
			}
			const activeOrderFromRes = _orders.find((item) => {
				return item.id === activeOrderId;
			});
			if (activeOrderFromRes) {
				setActiveOrder(activeOrderFromRes);
				if (activeOrder?.id === activeOrderFromRes?.id) {
					if (activeOrder?.status !== activeOrderFromRes?.status) {
						tick.play();
					}
				}
			}
		}
		return _orders;
	};
	const refresheOrders = async () => {
		const _orders = await checkOrders();
		// console.log("refresheOrders _orders , orders", _orders.length, orders);
		if (_orders) {
			// console.log("refresheOrders setOrders orders", _orders.length);
			setOrders([..._orders]);
		}
	};
	useEffect(() => {
		refresheOrders();

		// console.log("useEffect orders", orders);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			// console.log("setInterval orders", orders);
			refresheOrders();
		}, 7000);
		return () => clearInterval(interval);
	}, [orders]);

	useEffect(() => {
		const _activeOrder = orders.find((item) => {
			return item.id === activeOrderId;
		});
		if (_activeOrder) {
			setActiveOrder(Object.assign({}, _activeOrder));
		}
		console.log("useEffect activeOrderId", activeOrderId, activeOrder);
	}, [activeOrderId]);
	//@ts-ignore
	// const _asd = orders.map(item=>item[0]);

	const printChecks = () => {
		console.log("printChecks", checks, checksInner);
		Object.keys(checksInner).forEach((item: any) => {
			//@ts-ignore
			checks.push(...checksInner[item]);
		});
		[...checks].forEach((orderId) => {
			window.open(`http://magday.ru/mag_tools_check?orderId=${orderId}`);
		});
	};
	return (
		<div className="App">
			{/* <header className="App-header">
				<h1>Управление заказами </h1>
			</header> */}
			<main>
				<section className="sct-orders">
					<Divider orientation="left">Заказы</Divider>
					<Table
						rowSelection={{
							type: "checkbox",
							onChange: (keys, rows) => {
								// console.log("keys rows", keys, rows);
								//@ts-ignore
								setChecks([...keys]);
							},
						}}
						rowClassName={(record) => {
							return record.id === activeOrderId
								? "isActive"
								: "";
						}}
						size="small"
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									setActiveOrderId(record.id);
								},
							};
						}}
						rowKey="id"
						className="components-table-demo-nested"
						columns={columns}
						bordered
						expandable={{
							expandedRowRender,
							rowExpandable: (record) =>
								record.prevOrders.length > 0,
						}}
						dataSource={orders}
						title={() => (
							<Button onClick={printChecks}>
								<PrinterFilled />
								Печатать чеки
							</Button>
						)}
					/>
				</section>
			</main>
			<aside>
				{activeOrder && (
					<>
						<OrderDetail order={Object.assign({}, activeOrder)} />
						<UserDetail user={activeOrder.user} />
					</>
				)}
			</aside>
		</div>
	);
}

export default App;
