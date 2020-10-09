import React, { useState, useEffect } from "react";
import { ApiProduct } from "../../xxxx.js";
import ProductDetail from "./ProductDetail";

interface Props {
	addToBasketHendler: AddToBasket;
	breadcrumbs: any;
	slug: any;
	setSeo: any;
	weekIndex: number;
}
const ProductDetailContainer = (props: Props) => {
	const slug = (window).location.pathname.split(`/product/`)[1];
	const [img, setImg] = useState("");
	const [title, setTitle] = useState("");
	// const [totalWeight, setTotalWeight] = useState(0);
	// const [totalCaloricity, setTotalCaloricity] = useState("");
	const [price, setPrice] = useState(0);
	const [productId, setProductId] = useState<number>(0);
	const [excerpt, setExcerpt] = useState("");
	const [tags, setTags] = useState([]);

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
					let data: Product = res.product;
					console.log("resSingleProduct", data);
					// let imgRestUrl = data.img;
					// fetch(imgRestUrl)
					// 	.then((imgJson) => imgJson.json())
					// 	.then((imgJson) => {
					// 		// this.setState({ img: imgJson.source_url });
					// 		setImg(imgJson.source_url);
					// 	});
					// this.setState({ title: data.title.rendered });
					setTitle(data.name);
					setImg(data.img === false ? "false" : data.img);
					// this.setState({ price: data.price });
					setPrice(data.price);
					// this.setState({ productId: data.id });
					setProductId(data.id);
					// this.setState({ excerpt: data.excerpt.rendered });
					setExcerpt(data.shortDescription);
					let tags: any = [];
					if (data.tags) {
						data.tags.map((item: any) =>
							tags.push({ title: item.name })
						);
					}
					props.setSeo(data.seo);
					// this.setState({ tags: tags });
					setTags(tags);
				});
	}, []);

	return (
		<div>
			<ProductDetail
				img={img}
				title={title}
				totalWeight={0}
				totalCaloricity={""}
				price={price}
				excerpt={excerpt}
				tags={tags}
				productId={productId}
				addToBasketHendler={props.addToBasketHendler}
				//props.Breadcrumbs
				breadcrumbs={props.breadcrumbs}
				weekIndex={props.weekIndex}
			/>
		</div>
	);
};

export default ProductDetailContainer;
