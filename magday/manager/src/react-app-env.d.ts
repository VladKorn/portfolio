/// <reference types="react-scripts" />

type managerReq = OrdersGet;
interface OrdersGet {
	action: "getOrders";
	activeOrderId?:number;
}
interface OrdersRes{
	orders: Orders;
	lastOrderId: number;
	success: boolean;
}
interface updateOrder {
	action: "updateOrder";
	order: Order;
}

type OrderStatus =
	| "pending"
	| "processing"
	| "on-hold"
	| "completed"
	| "cancelled"
	| "refunded"
	| "failed";

type Orders = Array<Order> | [];
interface Order {
	id: number;
	currency: string;
	ip: string;
	payment_method: string;
	total: string;
	status: OrderStatus;
	email: string;
	phone: string;
	date: string;
	dateModified:string;
	items: Products;
	address: string;
	prevOrders: Array<Order>;
	comments: Array<any>;
	user: any;
}
type Products = Array<Product> | [];

interface Product {
	name: string;
	product_id: number;
	quantity: number;
	subtotal: any;
	billing: any;
	currency: string;
	weekIndex: number;
	price: number;
}
