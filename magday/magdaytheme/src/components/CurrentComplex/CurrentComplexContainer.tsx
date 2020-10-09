import React, { useEffect, useState } from "react";
import CurrentComplex from "./CurrentComplex";
import CurrentComplexHead from "./CurrentComplexHead";

import { DateTime } from "luxon";
import { restUrl } from "../../xxxx.js";

interface Props {
	generalData: any;
	timeIndex: number;
	timeStart: any;
	timeEnd: any;
	timerEndJsDate: any;
	addToBasketHendler: AddToBasket;
	basketItems: BasketItems;
	userLocation: any;
}

const CurrentComplexContainer = (props: Props) => {
	const [productId, setProductId] = useState(0);
	const [price, setPrice] = useState(0);
	const [oldPrice, setOldPrice] = useState(0);
	const [weekIndex, setWeekIndex] = useState(DateTime.local().weekday);
	const [discount, setDiscount] = useState(0);
	const [titles, setTitles] = useState([]);
	const [imgs, setImgs] = useState([]);

	useEffect(() => {
		let titles: any = [];
		let allDays = props.generalData.complex_week;
		if (allDays && allDays[weekIndex - 1]) {
			let cureentDayData = allDays[weekIndex - 1];
			// console.log('DateTime.weekday',allDays[weekIndex -1] );
			cureentDayData.complex_titles
				.split("+")
				.forEach((element: any, index: number) => {
					titles[index] = element;
				});
			const complexId = cureentDayData.complex;
			if (complexId) {
				fetch(`${restUrl}product/${complexId}`)
					.then((res) => res.json())
					.then((res) => {
						// console.log('cureentDayData',res)
						if (res.acf) {
							if (res.products_data) {
								let images: any = [];
								Object.keys(res.products_data).map((itemId) => {
									images.push(res.products_data[itemId].img);
								});
								// this.setState({imgs : images});
								setImgs(images);
							}

							// this.setState({price : res.acf.complex_price , productId: res.id });
							setProductId(res.id);
							setPrice(res.acf.complex_price);

							if (res.acf.complex_discount > 0) {
								const price = res.acf.complex_price;
								const discount = res.acf.complex_discount;
								let newPrice = 0;
								newPrice = price - (price / 100) * discount;
								setPrice(parseInt(newPrice.toFixed(0)));
								setDiscount(res.acf.complex_discount);
								setOldPrice(res.acf.complex_price)
							}
						} //if
					}); //fetch
			}
			// this.setState({titles : titles});
			setTitles(titles);
		}
	}, [props]);

	return productId ? (
		<CurrentComplex
			productId={productId}
			price={price}
			discount={discount}
			oldPrice={oldPrice}
			timeIndex={props.timeIndex}
			titles={titles}
			imgs={imgs}
			timeStart={props.timeStart}
			timeEnd={props.timeEnd}
			timerEndJsDate={props.timerEndJsDate}
			addToBasketHendler={props.addToBasketHendler}
			basketItems={props.basketItems}
			userLocation={props.userLocation}
		/>
	) : (
		<CurrentComplexHead text1="ЗДОРОВО И ВКУСНО" text2="КАЖДЫЙ ДЕНЬ" />
	);
};

export default CurrentComplexContainer;
