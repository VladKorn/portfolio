/// <reference types="react-scripts" />

// interface OrderRestApi {
// 	data: OrderRestApiGet | OrderRestApiSet;
// }
type SetSeo = (data: Seo) => void;
interface Seo {
	title: string;
	description: string;
	keywords: string;
}
interface ApiProductGetReq {
	type: "get";
	id?: number;
	slug?: string;
}
// type asd = id: number | slug:string;
type Products = {
	[key: number]: ProductSimple | ProductComplex;
};
interface Product {
	id: number;
	price: number;
	img: string | false;
	isComplex: boolean;
	name: string;
	slug: string;
	daysOfTheWeek: Array<string>;
	partsOfTheDay: Array<string>;
	seo: Seo;
	weight: number;
	tags: any;
	caloricity: number;
	shortDescription: string;
	composition?: Array<string>;
	isDisbled: boolean;
	dates: Array<string>;
}
interface ProductSimple extends Product {
	composition: Array<string>;
}
interface ProductComplex extends Product {
	products?: Products;
	personsCount: number;
	discount: number;
}

//
interface User {
	name: string;
	discount: number;
	email: string;
	id: number;
}
interface PageProps extends ComplexCardContainerProps {
	content: any;
	SitePointsList: any;
	title: string;
	bg: string;
	productsOnPage: Array<any>;
	dayPartIndex: number;
}

interface ComplexCardContainerProps {
	getProduct: any;
	products: Products;
	basketItems: BasketLocalItems;
	categories: any;
	onlyThisIds?: any;
	weekIndex: number;
	addToBasketHendler: addToBasket;
	timeIndex: number;
	сatScrollingId: number;
	setCatScrollingId: (val: number) => void;
}

type BasketItems = Array<BasketItem> | null;
interface BasketItem {
	id: number;
	img: string;
	link: string;
	title: string;
	description?: Array<any>;
	quantity: number;
	isComplex: boolean;
	personsCount?: number;
	price: number;
	weight: number;
	weekIndex: number;
}
type BasketLocalItems = Array<BasketLocalItem> | [];

interface BasketLocalItem {
	id: number;
	quantity: number;
	weekIndex: number;
}

type AddToBasket = (
	id: number,
	count: number,
	weekIndex: number,
	showAlert?: boolean
) => void;

type OrderStatus =
	| "pending"
	| "processing"
	| "on-hold"
	| "completed"
	| "cancelled"
	| "refunded"
	| "failed";
interface OrderRestApiGet {
	type: "get";
	url: string;
}
interface OrderRestApiSet {
	type: "get";
}

interface generalData {
	"DeliveryTerms--items1": any;
	"DeliveryTerms--items2": any;
	"DeliveryTerms--items3": any;
	SitePoints: Array<any>;
	breakfast: string;
	dinner: string;
	dinnerEnd: string;
	lunch: string;
	mainPage_bg: string;
	mainPage_content: string;
	mainPage_title: string;
	menuIsReady: boolean;
	our_cients: Array<any>;
	phone: string;
	seo_description: string;
	seo_keywords: string;
	seo_title: string;
	slogan: string;
	socki: Array<any>;
}
declare module "sweetalert2" {
	export * from "sweetalert2";
	// "export *" does not matches the default export, so do it explicitly.
	export { default } from "sweetalert2";
}
declare module "react-loading-bar" {
	export * from "react-loading-bar";
	export { default } from "react-loading-bar";
	// Current contents of the file, unchanged
}
declare module "react-input-mask" {
	export * from "react-input-mask";
	export { default } from "react-input-mask";
}

declare module "react-datetime-picker" {
	export * from "react-datetime-picker";
	export { default } from "react-datetime-picker";
}
