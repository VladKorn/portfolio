import React, { useState, useEffect, useRef } from "react";

import ComplexCard from "./ComplexCard";
import CatalogCardSkeleton from "./CatalogCardSkeleton";

import { weekItems } from "./../../xxxx";

// import showall from "../../images/ico-showall.png";
import { DateTime } from "luxon";


import NavByCategory from "./../NavByCategory/NavByCategory";
// import NavByPages from "./../NavByPages/NavByPages";

let initialWeekIndex: number | null = null;

let jsCatTitle = document.querySelectorAll<HTMLElement>(`.jsCatTitle`);
const scrollHendler = (
	catScrollingId: number,
	setCatScrollingId: (val: number) => void
) => {
	// console.log("scrollHendler");
	if (jsCatTitle) {
		for (let i = 0; i < jsCatTitle.length; i++) {
			const top = jsCatTitle[i].getBoundingClientRect().top;
			if (top > -120) {
				const catId = parseInt(jsCatTitle[i].dataset.id + "");
				// console.log("jsCatTitle[i]", jsCatTitle[i].dataset.id);
				// console.log("catId", catId , catScrollingId);
				// if (catId && catScrollingId !== catId) {
				setCatScrollingId(catId);
				// }
				break;
			}
		}
	}
};
interface GetDataParams {
	weekIndex?: number;
}
const prepareData = (
	products: any,
	data: any,
	basketItems: BasketLocalItems,
	weekIndex: number
): any => {
	// const products = props.products;
	// let data = products;
	if (products && Object.keys(products).length > 0) {
		// console.log("========products", products , Object.keys(products) , Object.keys(products).length);
		Object.keys(products).map((index) => {
			const productId = products[index].id;
			// console.log("productId-", productId, index);
			const product = products[index];
			data[productId] = {};
			// console.log("========prepareData product.isDisabled ", product.isDisabled);

			data[productId]["isComplex"] = product.isComplex;

			let quantity = 0;
			// console.clear()
			// console.log("basketItems", basketItems);
			const basketItem = basketItems.find((item) => {
				return item.id === productId && item.weekIndex === weekIndex;
			});
			// console.log("basketItem", basketItem);
			// console.log("basketItem", basketItem);
			// console.log("basketItem", basketItem);
			if (basketItem) {
				// console.log("basketItem.quantity", basketItem.quantity);

				quantity = basketItem.quantity;
			}
			data[productId]["quantity"] = quantity;

			data[productId]["name"] = product.name;
			data[productId]["dates"] = product.dates;
			data[productId]["slug"] = product.slug;
			data[productId]["price"] = product.price;
			data[productId]["isDisabled"] = product.isDisabled;

			data[productId]["discount"] = 0;
			data[productId]["personsCount"] = 1;
			data[productId]["images"] = [product.img];
			// console.log("product" , product);
			if (product.product_tags) {
				data[productId]["tags"] = product.product_tags;
			}
			data[productId]["dayOfTheWeek"] = product.daysOfTheWeek;
			//for sort of time index
			data[productId]["timeIndex"] = [];
			if (product.partsOfTheDay.includes("Затрак")) {
				data[productId]["timeIndex"].push(1);
			}
			if (product.partsOfTheDay.includes("Обед")) {
				data[productId]["timeIndex"].push(2);
			}
			if (product.partsOfTheDay.includes("Ужин")) {
				data[productId]["timeIndex"].push(3);
			}

			//
			// if(props.onlyThisIds){
			// 	if(props.onlyThisIds[productId]){
			// 		data[productId]['inrender'] = true;
			// 	}
			// } else{
			// 	data[productId]['inrender'] = true;
			// }

			if (product.isComplex) {
				data[productId]["isComplex"] = true;
				// console.log('products[productId]',products[productId]);
				data[productId]["price"] = product.price;
				data[productId]["discount"] = product.discount;
				data[productId]["personsCount"] = product.personsCount;

				let images: any = [];
				// product.acf.complex.forEach((item, index) => {
				// 	images.push(item.complex_img.url);
				// });
				Object.keys(product.products).forEach((id, index) => {
					images.push(product.products[id].img);
				});
				data[productId]["images"] = images;
				//
				let items: any = {};
				product.products.forEach((item: any, key: number) => {
					const id = key;
					items[id] = {
						title: product.products[id].title,
						weight: product.products[id].weight,
						quantity: item.quantity,
						link: product.products[id].link,
					};
				});
				data[productId]["items"] = items;

				//isComplex
			} else {
				//simple product

				let items: any = {}; // список
				if (product.composition) {
					product.composition.forEach((item: any, index: number) => {
						items[index] = {};
						items[index].title = item;
					});
				}
				data[productId]["items"] = items;
			} //else

			// console.log(product.acf.is_complex)
		});
	} //if(products){

	// this.setState({ products: data });
	return data;
};

const ComplexCardContainer = (props: ComplexCardContainerProps) => {
	const [categories, setCategories] = useState([]);
	const [complexes, setComplexes] = useState<any>({});
	const [dayId, setDayId] = useState(0);
	const [products, setProducts] = useState({});
	const productsLength = useRef(0);
	const [isToday, setIsToday] = useState(true);
	// const [сatScrollingId, setCatScrollingId] = useState(555);

	// console.log("props.products", props.products);

	// const prevCategories = useRef(categories)
	// const prevComplexes = useRef(complexes)

	const getProduct = (productId: number) => {
		// console.log("ComplexCardContainer getProduct", productId);
		props.getProduct(productId);
	};
	useEffect(() => {
		// console.log("ComplexCardContainer componentDidMount");
		// this.setState({ categories: props.categories });
		setCategories(props.categories);
		const data = prepareData(
			props.products,
			products,
			props.basketItems,
			props.weekIndex
		);
		// this.setState({ products: data });
		setProducts(data);

		// this.getData({ weekIndex: props.weekIndex });
		// const _dayId = getData({ weekIndex: props.weekIndex });
		// this.setState({ dayId: dayId });
		// setDayId(_dayId);
		initialWeekIndex = props.weekIndex;

		window.onscroll = () => {
			scrollHendler(props.сatScrollingId, props.setCatScrollingId);
		};
	}, []);

	//
	useEffect(() => {
		// console.log("CCC useEffect = weekIndex", props.weekIndex);
		// const _dayId = getData({ weekIndex: props.weekIndex });
		// setDayId(_dayId);
		const data = prepareData(
			props.products,
			products,
			props.basketItems,
			props.weekIndex
		);
		// this.setState({ products: data });
		setProducts(Object.assign({}, data));
	}, [props.weekIndex]);
	useEffect(() => {
		// console.log("CCC useEffect = props.categories", props.categories);

		let data = props.categories;
		if (props.onlyThisIds) {
			//sort by page ids
			props.categories.map((category: any, index: number) => {
				if (category.productsIds) {
					data[index].productsIds = category.productsIds.filter(
						(productId: any) => {
							let isin = props.onlyThisIds.includes(productId);
							return isin;
						}
					);
				}
			});
		}
		// this.setState({ categories: data });
		setCategories(data);
	}, [props.categories]);
	useEffect(() => {
		// console.log("CCC useEffect = categories", categories);

		//
		categories.map((category: any) => {
			if (category.productsIds) {
				category.productsIds.map((productId: number) => {
					// console.log('props.products[productId]' ,props.products[productId])
					if (typeof props.products[productId] === "undefined") {
						getProduct(productId);
					}
					// console.log(productId);
				});
			}
		});
		//
	}, [categories]);

	useEffect(() => {
		// console.log("CCC useEffect = complexes");

		let data: Products = products;
		Object.keys(complexes).map((complexId: any) => {
			let complex: any = complexes[complexId];
			data[complex.id] = complex;
		});
		// this.setState({ products: data });
		setProducts(data);
	}, [complexes]);
	useEffect(() => {
		// console.log("CCC useEffect = props.products", props.products , Object.keys(props.products).length !== Object.keys(products).length);

		// подготовка данных для ComplexCard
		// const products = props.products;
		// if (
		// 	Object.keys(props.products).length !== Object.keys(products).length
		// ) {
		// productsLength.current = Object.keys(props.products).length;
		const data = prepareData(
			props.products,
			products,
			props.basketItems,
			props.weekIndex
		);
		// console.log("setProducts", data);

		setProducts(Object.assign({}, data));
		// }
	}, [props.products]);

	useEffect(() => {
		jsCatTitle = document.querySelectorAll(`.jsCatTitle`);

		// console.log("initialWeekIndex", initialWeekIndex);
		if (initialWeekIndex !== props.weekIndex) {
			if (isToday) setIsToday(false);
		} else {
			if (!isToday) setIsToday(true);
		}
	});
	// console.log("AAAA products", products);

	return (
		<div id="Catalog-wrap" className="container">
			<aside>
				<NavByCategory
					items={categories}
					catScrollingId={props.сatScrollingId}
				/>
			</aside>
			<section className=" сomplex-сard-wrap Catalog">
				{categories.map((category: any, index: number) => (
					<Item
						addToBasketHendler={props.addToBasketHendler}
						index={index}
						key={index}
						category={category}
						products={products}
						isToday={isToday}
						weekIndex={props.weekIndex}
						initialWeekIndex={initialWeekIndex}
					/>
				))}
			</section>
		</div>
	);
};

interface ItemProps {
	products: any;
	category: any;
	index: number;
	addToBasketHendler: AddToBasket;
	isToday: boolean;
	weekIndex: number;
	initialWeekIndex: number|null;
}
const Item = (props: ItemProps) => {
	const {
		index,
		category,
		products,
		addToBasketHendler,
		isToday,
		weekIndex,
		initialWeekIndex
	} = props;
	if (!category.productsIds) {
		return <p>"нет товаров"</p>;
	}
	// console.log("Item", products);
	return (
		<React.Fragment key={index}>
			<div
				className="Catalog-row jsCatTitle"
				data-id={category.term_id}
				id={"categoryTitleId" + category.term_id}
			>
				<span className="Catalog--category-title">
					<span>{category.name}</span>
				</span>
			</div>
			{category.productsIds.map((productId: any, index: number) => {
				const product = products[productId];
				// console.log('==product=' ,product  , productId , products);

				if (!product) {
					return (
						<CatalogCardSkeleton
							key={"CatalogCardSkeleton" + index}
						/>
					);
				}
				let isDisabled = false;
				if (product.dates && initialWeekIndex) {
					// console.clear();
					// console.log("product.dates" , product.dates);
					let days = weekIndex - initialWeekIndex;
					if(days < 0){
						days = 7 + days;
					}
					const date =  DateTime.local().plus({days: days}).toFormat('yyyy-LL-dd');
					// console.log("DateTime.local()" , date , initialWeekIndex, weekIndex, days);
					// console.log("includes" , product.dates.includes(date));
					if(!product.dates.includes(date+"")){
						isDisabled = true;
					}
					// initialWeekIndex
				} else {
					if (
						!product.dayOfTheWeek.includes(weekItems[weekIndex - 1])
					) {
						isDisabled = true;
					}
				}
				// console.log("product" , product.isDisabled)
				if (product.isDisabled === true) {
					isDisabled = true;
				}
				// ||
				// !products[
				// 	productId
				// ].timeIndex.includes(
				// 	this.props
				// 		.timeIndex
				// )
				return (
					<ComplexCard
						key={productId}
						addToBasketHendler={addToBasketHendler}
						isPreorder={!isToday}
						isDisabled={isDisabled}
						isComplex={product.isComplex}
						quantity={product.quantity}
						productId={productId}
						title={product.name}
						link={product.slug}
						price={product.price}
						discount={product.discount}
						personsCount={product.personsCount}
						tags={product.tags}
						items={product.items}
						images={product.images}
						weekIndex={weekIndex}
					/>
				);
			})}
		</React.Fragment>
	);
};

export default ComplexCardContainer;
