import React, { useState, useEffect } from "react";
import { restUrl } from "../../xxxx.js";

import Page from "./Page";
interface Props {
	slug: string;
	setCategories: any;
	setSeo: any;
	SitePointsList: any;
	addToBasketHendler: any;
	basketItems: any;
	categories: any;
	getProduct: any;
	products: Products;
	weekIndex: any;
	timeIndex: any;
	сatScrollingId: number;
	setCatScrollingId: (val: number) => void;
}

const PageContainer = (props: Props) => {
	const slug =  props.slug;

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [bg, setBg] = useState("");
	const [productsOnPage, setProductsOnPage] = useState([]);

	useEffect(() => {
		fetch(`${restUrl}pages/?slug=${slug}`)
			.then((res) => res.json())
			.then((res) => {
				let data = res[0];
				console.log("pages res", data);
				// setState({ content: data.content.rendered });
				setContent(data.content.rendered);
				// setState({ title: data.acf["content--title"] });
				setTitle(data.acf["content--title"]);
				let imgUrl = "";

				if (data._links["wp:featuredmedia"]) {
					imgUrl = data._links["wp:featuredmedia"][0].href;
					fetch(`${imgUrl}`)
						.then((img) => img.json())
						.then((img) => {
							// console.log('imgimgimgimgimgimgimgimgimgimg',img);
							// setState({ bg: img.source_url });
							setBg(img.source_url);
						});
				}

				let productsOnPage: any = [];
				if (data.acf.productsOnPage) {
					data.acf.productsOnPage.map((item: any) =>
						productsOnPage.push(item.item)
					);
				}
				// setState({ productsOnPage: productsOnPage });
				setProductsOnPage(productsOnPage);

				let categories: any = [];
				if (data.acf.productsOnPage) {
					data.acf.productsOnPage.map((cat: any, index: number) => {
						// console.log('data.acf.productsOnPage -- cat',cat);
						// let productsIds =[];
						// cat.items.map(item=>{productsIds.push(item.item)});
						let ids:any =[];
						if(cat.items){
							ids = cat.items.map((item: any) => item.item);
						}
						// console.log('cat.items',ids);

						let data = {
							name: cat.category,
							term_id: index,
							productsIds: ids,
						};
						// console.log('productsIds' , 'data', data)

						categories[index] = data;
					});
				}
				// console.clear();
				console.log('categories' , categories)
				props.setCategories(categories);

				props.setSeo(data.seo);
			});
	}, []);
	return (
		<Page
			title={title}
			content={content}
			bg={bg}
			productsOnPage={productsOnPage}
			SitePointsList={props.SitePointsList}
			addToBasketHendler={props.addToBasketHendler}
			basketItems={props.basketItems}
			categories={props.categories}
			getProduct={props.getProduct}
			products={props.products}
			weekIndex={props.weekIndex}
			timeIndex={props.timeIndex}
			onlyThisIds={productsOnPage}
			dayPartIndex={0}
			сatScrollingId={props.сatScrollingId}
			setCatScrollingId={props.setCatScrollingId}
		/>
	);
};

export default PageContainer;
