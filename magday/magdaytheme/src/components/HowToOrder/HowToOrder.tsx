import React from "react";
import "./index.css";

const HowToOrder = () => {
	return (
		<section className="HowToOrder">
			<div className="container">
				<span className="HowToOrder--title">КАК ЗАКАЗАТЬ?</span>
				<ul>
					<li>
						<div className="step-number">1</div>
						<span className="title">
							Выберите
							<br /> блюда
						</span>
						<p>
							Из 6 комплексных обедов,
							<br /> либо самостоятельно любое
							<br /> блюдо из меню дня
						</p>
					</li>
					<li>
						<div className="step-number">2</div>
						<span className="title">
							Оформите
							<br /> заказ
						</span>
						<p>
							Минимальная сумма <br /> заказа 50 рублей. <br />
							Доставка бесплатная
						</p>
					</li>
					<li>
						<div className="step-number">3</div>
						<span className="title">
							Дождитесь
							<br /> звонка оператора
						</span>
						<p>
							Мы свяжемся с вами
							<br /> в течении 5 минут
						</p>
					</li>
					<li>
						<div className="step-number">4</div>
						<span className="title">
							Ожидайте
							<br /> доставки заказа
						</span>
						<p>
							Отслеживая на сайте состояние
							<br /> заказа и нахождение курьера
						</p>
					</li>
					<li>
						<div className="step-number">5</div>
						<span className="title">
							Оплатитите
							<br /> удобным способом
						</span>
						<p>
							Мы принимаем <br />
							любые способы оплаты
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};
export default HowToOrder;
