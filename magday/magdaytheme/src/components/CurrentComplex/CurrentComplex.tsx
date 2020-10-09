import React, { useState } from 'react'
import Countdown from 'react-countdown';
// import { DateTime }  from'luxon';
import { DateTime } from "luxon";
import Counter from '../Counter/Counter';

import './index.css'; 


import icoFire from '../../images/fire.png';
import icoTime from '../../images/ico-time.png';
import paymentMethodsIcons from '../../images/payment-methods-icons.png';


interface Props{
	timeIndex: number;
	timeEnd: any;
	timerEndJsDate: any;
	timeStart: any;
	titles: Array<any>;
	imgs: Array<any>;
	oldPrice: number;
	addToBasketHendler: AddToBasket;
	userLocation: any
	basketItems: BasketItems
	price: number
	productId: number
	discount: number


}

const CurrentComplex = (props:Props) => {
	const [title , setTitle ] = useState('')
	const [timeEnd , setTimeEnd ] = useState(DateTime.fromObject({hour: props.timeEnd.h , minute: props.timeEnd.m}))


		return (
			<div className='CurrentComplex'>
				<div className="container">
				<div className="CurrentComplex--first-wrap">
					<h2>Комплексный <span>
						{props.timeIndex === 1 ? 'завтрак' : ''}
						{props.timeIndex === 2 ? 'обед' : ''}
						{props.timeIndex === 3 ? 'ужин' : ''}
					</span></h2>
						<div className="time">c {props.timeStart} до {props.timeEnd}</div>
							<Countdown 
								date={props.timerEndJsDate} 
								renderer={
									({ hours, minutes, seconds, completed }) => {
										if (completed) {return '';} else {
											return <div className='Countdown'>
												{/* <span><i>{hours[0]}</i>  <i>{hours[1]}</i><b>:</b></span>
												<span><i>{minutes[0]}</i><i>{minutes[1]}</i><b>:</b></span>
												<span><i>{seconds[0]}</i><i>{seconds[1]}</i></span> */}
												<img src={icoFire} alt=""/>
											</div>;
										}
									}
								}
								/>
				<span>

				Осталось до конца 
						{props.timeIndex === 1 ? ' завтрака' : ''}
						{props.timeIndex === 2 ? ' обеда' : ''}
						{props.timeIndex === 3 ? ' ужина' : ''}
				</span>
			</div>
			<div className="CurrentComplex--main-wrap">
				<div className="CurrentComplex--titles">
					{props.titles.map((item) => <span key={item}> {item} <i>+</i></span>)}
				</div>
				<div className="CurrentComplex--images">				
					{props.imgs.map((item , index) => <img key={index} src={item} alt="" /> )}
				</div>
				<div className="bottom-wrap">
						{props.oldPrice ? <div className="old-price">{props.oldPrice} руб.</div> :''} 
						<div className="price">{props.price} руб.</div>
						{props.discount ? <div className="discount">Скидка {props.discount} %</div> : ''} 
					<Counter 
						addToBasketHendler={props.addToBasketHendler}
						productId={props.productId}
						value={0}//todo
						weekIndex={0}//todo
					/>  
				</div>
			</div>
			<div className="CurrentComplex--last-wrap">
				<p>Бесплатная доставка <br/>{ props.userLocation.city ? 'по г. ' + props.userLocation.city.name_ru : ''}</p>
				<div className="delivery--time" style={{backgroundImage: 'url(' + icoTime + ')' }}>
					в течении <br/>
					24 минут 
				</div>
				<div className="payment-methods-icons">
					Онлайн оплата
					<img src={paymentMethodsIcons} alt="Онлайн оплата"/>
				</div>
				

			</div>
		</div>
			</div>
		)
}

export default CurrentComplex;