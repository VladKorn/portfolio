import React, { useState, useEffect } from "react";
import ComplexDetail from "./ComplexDetail";
import { ApiProduct } from "../../xxxx.js";

interface Props {
	complexSlug: any;
	addToBasketHendler: AddToBasket;
	basketItems: any;
	breadcrumbs: any;
	weekIndex: number;
}

const ComplexDetailContainer = (props: Props) => {
	const slug = props.complexSlug.location.pathname.split(`/complex/`)[1];

	const [items, setItems] = useState<any>([]);

	const [product, setProduct] = useState<ProductComplex | null>(null);

	// console.log('slug' ,slug);
	useEffect(() => {
		const apiProductReq: ApiProductGetReq = {
			type: "get",
			slug: slug,
		};
		fetch(ApiProduct, {
			method: "post",
			body: JSON.stringify(apiProductReq),
		})
			.then((res) => res.json())
			.then((res) => {
				// let data = res[0];
				// setTitle(data.name);
				// setPrice(data.acf.complex_price);
				// setDiscount(data.acf.complex_discount);
				// setProductId(data.id);
				setProduct(res.product);
				setItems(res.product.products);

				// console.log("data", data);

				// let items: any = {};
				// res.product?.products.map((item: any) => {
				// 	items[item.id] = {};
				// });
				// this.setState({ personsCount: data.acf.persons_count });
				// console.log(`resresres`,res[0]);
			});
	}, []);
	// useEffect(() => {
	// 	Object.keys(items).map((productId: any) => {
	// 		const apiProductReq: ApiProductGetReq = {
	// 			type: "get",
	// 			id: parseInt(productId),
	// 		};
	// 		fetch(ApiProduct, {
	// 			method: "post",
	// 			body: JSON.stringify(apiProductReq),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((product) => {
	// 				// console.log('resitem',product)
	// 				let _items: any = items;
	// 				let item = {
	// 					title: product.title.rendered,
	// 					img: product.product_img,
	// 					caloricity: product.product_caloricity,
	// 					weight: product.product_weight,
	// 					excerpt: product.excerpt.rendered,
	// 					link: product.slug,
	// 				};
	// 				items[productId] = item;
	// 				// this.setState({ items: _items });
	// 				setItems(_items);
	// 			});
	// 	});
	// }, [items]);
	if (!product) {
		return null;
	}
	return (
		<div>
			<ComplexDetail
				price={product.price}
				title={product.name}
				items={items}
				personsCount={product.personsCount}
				discount={product.discount}
				productId={product.id}
				addToBasketHendler={props.addToBasketHendler}
				// basketItems={props.basketItems}
				breadcrumbs={props.breadcrumbs}
				weekIndex={props.weekIndex}
			/>
		</div>
	);
};

export default ComplexDetailContainer;
