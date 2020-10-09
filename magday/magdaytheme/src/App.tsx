import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Swal from "sweetalert2";
// import LoadingBar from "react-loading-bar";
import LoadingBar from "react-top-loading-bar";
import "react-loading-bar/dist/index.css";
// import withReactContent from 'sweetalert2-react-content';
import { DateTime } from "luxon";
import { siteUrl, ApiProduct } from "./xxxx.js";

import "./normalize.css";
import "./App.css";

import Headpanel from "./components/Headpanel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import Page from "./components/Page/Page";

// import CurrentComplexContainer from "./components/CurrentComplex/CurrentComplexContainer";
import NavByWeek from "./components/NavByWeek/NavByWeek";
// import TimeLineContainer from "./components/TimeLine/TimeLineContainer";
// import NavByCategory from "./components/NavByCategory/NavByCategory";
// import ComplexCard from './components/ComplexCard/ComplexCard';
import ComplexCardContainer from "./components/ComplexCard/ComplexCardContainer";
// import ComplexDetail from './components/ComplexDetail/ComplexDetail';
import ComplexDetailContainer from "./components/ComplexDetail/ComplexDetailContainer";
// import BasketList from "./components/BasketList/BasketList";
import DeliveryTerms from "./components/DeliveryTerms/DeliveryTerms";
import PageContainer from "./components/Page/PageContainer";
import PageHeaderContainer from "./components/PageHeader/PageHeaderContainer";
import ProductDetailContainer from "./components/ProductDetail/ProductDetailContainer";
// import OurCients from "./components/OurCients/OurCients";
import MobileApps from "./components/MobileApps/MobileApps";
// import Reviews from "./components/Reviews/Reviews";
// import SignUp from "./components/SignUp/SignUp";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Location from "./components/Location/Location";
import PageOrder from "./components/PageOrder/PageOrder";
// import OrderForm from "./components/OrderForm/OrderForm";

import SitePoints from "./components/SitePoints/SitePoints";
import HowToOrder from "./components/HowToOrder/HowToOrder";
import PageBasket from "./components/PageBasket/PageBasket";
import MobMenu from "./components/MobMenu/MobMenu";
import PageUser from "./components/PageUser/PageUser";
import BasketMobile from "./components/BasketMobile/BasketMobile";
import NotFound from "./components/NotFound/NotFound";
// import PageHeader from "./components/PageHeader/PageHeader";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import Callback from "./components/Callback/Callback";

// import lunchImg from "./images/lunch.png";

// import Psd from "./components/Psd/Psd";

//cs_efdd0c15be9abe37fa505dd99828f1012081ec8c secret
//ck_b5c303829d5dd78cbceaeba6317cc7f96018fc6a key

if (
	localStorage.basketItems &&
	!Array.isArray(JSON.parse(localStorage.basketItems))
) {
	localStorage.removeItem("basketItems");
}
const logout = () => {
	localStorage.user = "";
	window.location.reload(false);
};
const Swal = (window as any).Swal;
const lunchImg = process.env.PUBLIC_URL + "/images/lunch.png";

const App = () => {
	const [breadcrumbs, setBreadcrumbs] = useState({
		link: "/",
		title: "Обеды на дом и в офис",
	});
	const [route, setRoute] = useState("");
	const [pages, setPages] = useState<any>([]);
	const [loadingBar, setLoadingBar] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [user, setUser] = useState(null);
	const [products, setProducts] = useState<Products>({});
	const [productsWainting, setProductsWainting] = useState<any>({});
	const [categories, setCategories] = useState<any>([]);
	const [compexesIds, setCompexesIds] = useState([]);
	const [weekIndex, setWeekIndex] = useState(DateTime.local().weekday);
	// const [userLocation, setUserLocation] = useState("");
	const [menuPrimary, setMenuPrimary] = useState({});
	const [generalData, setGeneralData] = useState<generalData | any>({
		menuIsReady: "true",
	});
	const [basketItems, setBasketItems] = useState(
		JSON.parse(localStorage.basketItems || `[]`)
	);
	const [timeIndex, setTimeIndex] = useState(0);
	// const [timeStart, setTimeStart] = useState("0");
	// const [timeEnd, setTimeEnd] = useState("0");
	// const [timerEndJsDate, setTimerEndJsDate] = useState(0);
	// const [dateTime, setDateTime] = useState(DateTime.local());
	const [asideIsOpen, setAsideIsOpen] = useState(false);
	const [сatScrollingId, setCatScrollingId] = useState(555);
	const [callbackIsOpen, setCallbackIsOpen] = useState(false);
	const LoadingBarRef = useRef(null);

	const setSeo: SetSeo = (data: Seo) => {
		// console.log('setSeo', data);
		if (data.title) {
			document.title = data.title.replace(`&#8212;`, "");
		}
		const description = document.querySelector(".jsMetaDescription");
		if (description) {
			description.innerHTML = data.description;
		}

		// document.head.appendChild(description);
		const keywords = document.querySelector(".jsMetaDescription");
		if (keywords) {
			keywords.innerHTML = data.keywords;
		}
		// document.head.appendChild(keywords);
	};
	// const _setUser = (userData: any) => {
	// 	// console.log('userData',userData);
	// 	// setState({ user: userData });
	// 	setUser(userData);
	// 	// setState({ isAuthorized: true });
	// 	setIsAuthorized(true);
	// 	localStorage.user = JSON.stringify(userData);
	// };
	useEffect(() => {
		if (loadingBar) {
			// @ts-ignore
			LoadingBarRef.current.continuousStart();
		} else {
			// @ts-ignore
			LoadingBarRef.current.complete();
		}
	}, [loadingBar]);
	useEffect(() => {
		if (user) {
			localStorage.user = JSON.stringify(user);
		}
	}, [user]);
	const _weekChange = (index: number) => {
		// setState({ weekIndex: index });
		setWeekIndex(index);
		// console.log('weekChange' , event.target.dataset.index);
	};
	const addToBasket = (
		id: number,
		count: number,
		weekIndex: number,
		showAlert: boolean = true
	) => {
		console.log(
			`addToBasket - id , count , weekIndex , showAlert`,
			id,
			count,
			weekIndex,
			showAlert
		);
		// let items: BasketLocalItems = [...basketItems];
		let items: BasketLocalItems = [...basketItems];

		const inBasketItem = items.find((item) => {
			return item.id === id && item.weekIndex === weekIndex;
		});
		if (inBasketItem) {
			const index = items.indexOf(inBasketItem);
			if (count > 0) {
				items[index].quantity = count;
			} else {
				items.splice(index, 1);
			}
		} else {
			if (count > 0) {
				items.push({
					id: id,
					quantity: count,
					weekIndex: weekIndex,
				});
			}
		}
		// remove

		// if (items[id].quantity === 0) { todo
		// 	delete items[id];
		// }
		// setState({ basketItems: items });
		setBasketItems(items);
		if (showAlert) {
			if (count > 0) {
				Swal.fire({
					icon: "success",
					// title:'товар успешно добавлен в корзину',
					showConfirmButton: false,
					focusConfirm: false,
					onOpen: function () {
						const el = document.querySelector<HTMLElement>(
							"#upqjep"
						);
						if (el) {
							el.onclick = function () {
								Swal.close();
							};
						}
					},
					html: `
					<p style='margin-top: 0;'>товар успешно добавлен в корзину</p>
					<div style='display:flex; justify-content: space-around;'>
						<button class='button gray' id='upqjep'> Продолжить</button>
						<a href='/basket' class='button gray'> Оформить заказ</a>
					</div>
					`,
				});
			} else {
				Swal.fire({
					icon: "info",
					text: "товар удалён из корзины",
				});
			}
		}
	};
	const getProduct = (productId: number) => {
		// console.log('getProduct' , productId);
		if (productId) {
			if (
				typeof products[productId] === "undefined" &&
				productsWainting[productId] !== "waiting"
			) {
				let data = productsWainting;
				data[productId] = "waiting";
				// setState({ productsWainting: data });
				setProductsWainting(data);
				fetchProduct(productId);
			}
		}
	};
	const fetchProduct = (productId: number) => {
		// console.log('fetchProduct' , productId)
		if (productId && productId > 0) {
			// console.log('fetchProduct' , productId)

			let data = products;
			//
			const apiProductReq: ApiProductGetReq = {
				type: "get",
				id: productId,
			};
			fetch(ApiProduct, {
				method: "post",
				body: JSON.stringify(apiProductReq),
			})
				.then((res) => res.json())
				.then((res) => {
					// console.log("ApiProductGetReq res", res);
					data[productId] = res.product;
					// setState({ products: data });
					setProducts(Object.assign({}, data));
				});
		}
		// fetch(`https://magday.ru/wp-json/wp/v2/product/${productId}`)
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		// console.log('App getProduct productId fetch' , res);
		// 		data[productId] = res;
		// 		setState({ products: data });
		// 	});
	};
	const getCategories = () => {
		//get categories
		if (window.location.pathname === "/") {
			// setState({
			// 	breadcrumbs: { link: "/", title: "Обеды на дом и в офис" },
			// });
			setBreadcrumbs({ link: "/", title: "Обеды на дом и в офис" });
			setTimeout(() => {
				fetch(`${siteUrl}/api/categories.php`)
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						res["categories"].splice(0, 1);
						console.log("categories res", res);
						let data = [];
						data[0] = {
							name: "Бизнес ланч",
							productsIds: res["compexesIds"],
							img: lunchImg,
							term_id: 555,
						};
						data.push(...res["categories"]);
						// setState({ categories: data });
						setCategories(data);
						// setState({ compexesIds: res["compexesIds"] });
						setCompexesIds(res["compexesIds"]);
					});
			}, 400);
		}
	};
	const onRouteChanged = () => {
		console.log("===onRouteChanged===");
		setSeoHome();
		// setState({ route: window.location.pathname });
		setRoute(window.location.pathname);
		getCategories();
		//
		// setState({ loadingBar: true });
		setLoadingBar(true);
		setTimeout(() => {
			// setState({ loadingBar: false });
			setLoadingBar(false);
		}, 200);
		window.scrollTo(0, 0);

		//breadcrumbs
		if (window.location.pathname === "/pitanie-na-predprijatii/") {
			// setState({
			// 	breadcrumbs: {
			// 		link: "/pitanie-na-predprijatii/",
			// 		title: "Питание на предприятии",
			// 	},
			// });
			setBreadcrumbs({
				link: "/pitanie-na-predprijatii/",
				title: "Питание на предприятии",
			});
		}
		if (window.location.pathname === "/kejtering-bankety/") {
			// setState({
			// 	breadcrumbs: {
			// 		link: "/kejtering-bankety/",
			// 		title: "Выездной кейтеринг, банкеты",
			// 	},
			// });
			setBreadcrumbs({
				link: "/kejtering-bankety/",
				title: "Выездной кейтеринг, банкеты",
			});
		}
	};
	useEffect(() => {
		localStorage.basketItems = JSON.stringify(basketItems);

		// if (
		// 	generalData &&
		// 	generalData.breakfast !== prevState.generalData.breakfast
		// ) {
		// 	console.log("setState({timeIndex :");
		// 	let now = DateTime.local().toFormat("HHmm");
		// 	let breakfast = parseInt(
		// 		generalData.breakfast.replace(":", ""),
		// 		10
		// 	);
		// 	let lunch = parseInt(
		// 		generalData.lunch.replace(":", ""),
		// 		10
		// 	);
		// 	let dinner = parseInt(
		// 		generalData.dinner.replace(":", ""),
		// 		10
		// 	);
		// 	let dinnerEnd = parseInt(
		// 		generalData.dinnerEnd.replace(":", ""),
		// 		10
		// 	);
		// 	if (now > breakfast && now < lunch) setState({ timeIndex: 1 });
		// 	if (now > lunch && now < dinner) setState({ timeIndex: 2 });
		// 	if (now > dinner && now < dinnerEnd)
		// 		setState({ timeIndex: 3 });
		// 	if (now > dinnerEnd && now < breakfast)
		// 		setState({ timeIndex: 0 });

		// 	// console.log( 'now' , now ,'breakfast' , breakfast , 'lunch' ,lunch , 'dinner' , dinner , 'dinnerEnd' , dinnerEnd);
		// }

		// if (
		// 	generalData.breakfast &&
		// 	generalData.lunch &&
		// 	generalData.dinner &&
		// 	generalData.dinnerEnd
		// ) {
		// 	if (
		// 		prevState.timeIndex !== timeIndex ||
		// 		timeStart !== prevState.timeStart
		// 	) {
		// 		const data = generalData;
		// 		if (timeIndex === 1) {
		// 			setState({
		// 				timeStart: data.breakfast,
		// 				timeEnd: data.lunch,
		// 			});
		// 		}
		// 		if (timeIndex === 2) {
		// 			setState({
		// 				timeStart: data.lunch,
		// 				timeEnd: data.dinner,
		// 			});
		// 		}
		// 		if (timeIndex === 3) {
		// 			setState({
		// 				timeStart: data.dinner,
		// 				timeEnd: data.dinnerEnd,
		// 			});
		// 		}
		// 	}
		// }
		// if (prevState.timeEnd !== timeEnd) {
		// 	let time = timeEnd.split(":");
		// 	let timeEnd = DateTime.local().set({
		// 		hours: time[0],
		// 		minutes: time[1],
		// 	});
		// 	setState({ timerEndJsDate: timeEnd.ts });
		// 	// console.log('timeEnd',timeEnd , time , timeEnd)
		// }
	});
	const setSeoHome = () => {
		if (generalData && generalData.seo_title !== document.title) {
			if (window.location.pathname === "/") {
				let data: Seo = {
					title: generalData.seo_title,
					description: generalData.seo_description,
					keywords: generalData.seo_keywords,
				};
				setSeo(data);
			}
		}
	};
	useEffect(() => {
		setSeoHome();
	}, [generalData]);

	useEffect(() => {
		document.addEventListener(
			"DOMContentLoaded",
			() => {
				console.log("DOMContentLoaded");
				setTimeout(() => {
					if (loadingBar === true) {
						// setState({ loadingBar: false });
						setLoadingBar(false);
					}
				}, 1000);
			},
			false
		);
		setTimeout(() => {
			if (loadingBar === true) {
				setLoadingBar(false);
			}
		}, 3000);

		if (localStorage.user) {
			setUser(JSON.parse(localStorage.user));
		}

		fetch(`${siteUrl}wp-json/menus/v1/menus/primary`)
			.then((res) => res.json())
			.then((res) => {
				// setState({ menuPrimary: res.items });
				setMenuPrimary(res.items);
			});
		// fetch(`http://api.sypexgeo.net/json/`).then((res)=>{return res.json()}).then((res)=>{
		// 	// console.log('userLocation', res)
		// 	setState({userLocation: res});
		// });
		fetch(`${siteUrl}/wp-json/acf/v3/options/options`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				// setState({ generalData: res["acf"] });
				setGeneralData(res["acf"]);
			});
		//get categories
		getCategories();

		fetch("https://magday.ru/api/get_pages.php")
			.then((res) => res.json())
			.then((res) => {
				// console.log("api/get_pages", res);
				// setState({ pages: res });
				setPages(res);
			});
	}, []);

	const _setCategories = (categories: any) => {
		console.log("setCategories", categories);
		// let data=[];
		// categories.map(cat=>{
		// 	cat['productsIds'] = cat.ids
		// 	data.push(cat);
		// });
		// setState({ categories: categories });
		setCategories(categories);
	};
	return (
		<Router>
			<div className="App">
				{callbackIsOpen && (
					<Callback setCallbackIsOpen={setCallbackIsOpen} />
				)}
				<BasketMobile
					products={products}
					basketItems={basketItems}
					getProduct={getProduct}
					link={"/basket"}
				/>
				<MobMenu
					isOpen={asideIsOpen}
					setIsOpeen={setAsideIsOpen}
					menuPrimary={menuPrimary}
					categories={categories}
					сatScrollingId={сatScrollingId}
					setCatScrollingId={setCatScrollingId}
				/>
				<LoadingBar color="#78c2e4" ref={LoadingBarRef} />
				<Headpanel
					message="<b>Лучшие цены</b> на готовую <b>еду ресторанного</b> качества!"
					description="Время <b>бесплатной</b> доставки обедов <b>до 40 мин.</b> "
				/>
				<Location onRouteChanged={onRouteChanged} />
				<Header
					slogan={generalData.slogan}
					phone={generalData.phone}
					basketItems={basketItems}
					products={products}
					getProduct={getProduct}
					menuPrimary={menuPrimary}
					// categories={categories}
					//NavByWeek
					// weekIndex={weekIndex}
					// DateTime={DateTime}
					// clickHandler={weekChange}
					//basket
					isAuthorized={isAuthorized}
					setUser={setUser}
					user={user}
					setAsideIsOpen={setAsideIsOpen}
					logout={logout}
					setCallbackIsOpen={setCallbackIsOpen}
				/>
				<main>
					{/* <Route
							path="/"
							exact
							render={(props) => (
								<CurrentComplexContainer
									addToBasketHendler={addToBasket}
									basketItems={basketItems}
									timerEndJsDate={timerEndJsDate}
									timeIndex={timeIndex}
									timeEnd={timeEnd}
									timeStart={timeStart}
									generalData={generalData}
									userLocation={userLocation}
								/>
							)}
						/> */}

					{/* {["/complex", "/product"].map((path, index) => (
						<Route
							key={index}
							path={path}
							render={(props) => (
								<CurrentComplexContainer
									addToBasketHendler={addToBasket}
									basketItems={basketItems}
									timerEndJsDate={timerEndJsDate}
									timeIndex={timeIndex}
									timeEnd={timeEnd}
									timeStart={timeStart}
									generalData={generalData}
									userLocation={userLocation}
								/>
							)}
						/>
					))} */}

					{/* page */}
					{pages.map((page: any, index: number) => (
						<Route
							key={index}
							path={"/" + decodeURI(page.post_name)}
							render={(props) => (
								<PageHeaderContainer slug={props} />
							)}
						/>
					))}
					{/* <Route
						key={"MainPageHeader"}
						path={"/"}
						exact
						render={(props) => (
							<PageHeader
								title={generalData.mainPage_title}
								headerBg={"headerBg"}
							/>
						)}
					/> */}

					{/* <Route path='/page/' render={(props) => (
							<PageHeaderContainer
								slug={props}
								addToBasketHendler={addToBasket}
								basketItems={basketItems}
								weekIndex={weekIndex}
							/>
						)}/> */}
					<Switch>
						<Route path="/basket" exact render={(props) => <></>} />
						<Route path="/order" render={(props) => <></>} />
						<Route
							path="/"
							render={(props) => (
								<NavByWeek
									weekIndex={weekIndex}
									DateTime={DateTime}
									clickHandler={_weekChange}
									menuIsReady={
										generalData.menuIsReady === "true"
											? true
											: false
									}
								/>
							)}
						/>
					</Switch>
					{/* <TimeLineContainer
							timerEndJsDate={timerEndJsDate}
							timeIndex={timeIndex}
							generalData={generalData}
						/> */}
					{/* <NavByCategory items={categories} /> */}
					<Switch>
						<Route
							path="/order/"
							render={(props) => (
								<PageOrder
									items={basketItems}
									getProduct={getProduct}
									products={products}
									addToBasket={addToBasket}
									//orderform
									isAuthorized={isAuthorized}
									user={user}
								/>
							)}
						/>
						<Route
							path="/basket"
							exact
							render={(props) => (
								<PageBasket
									items={basketItems}
									getProduct={getProduct}
									products={products}
									addToBasket={addToBasket}
									//orderform
									isAuthorized={isAuthorized}
									user={user}
								/>
							)}
						/>
						{/* pages */}
						<Route
							path="/user"
							exact
							render={(props) => (
								<PageUser user={user} logout={logout} />
							)}
						/>
						<Route
							path="/OrderHistory"
							exact
							render={(props) => <OrderHistory />}
						/>

						<Route
							path="/product"
							render={(props) => (
								<ProductDetailContainer
									addToBasketHendler={addToBasket}
									slug={props.location.pathname.split("/")[2]}
									setSeo={setSeo}
									breadcrumbs={breadcrumbs}
									weekIndex={weekIndex}
								/>
							)}
						/>

						<Route
							path="/complex"
							render={(props) => (
								<ComplexDetailContainer
									complexSlug={props}
									addToBasketHendler={addToBasket}
									basketItems={basketItems}
									breadcrumbs={breadcrumbs}
									weekIndex={weekIndex}
								/>
							)}
						/>

						<Route
							path="/"
							exact
							render={(props) => (
								<>
									<ComplexCardContainer
										addToBasketHendler={addToBasket}
										basketItems={basketItems}
										categories={categories}
										getProduct={getProduct}
										products={products}
										weekIndex={weekIndex}
										timeIndex={timeIndex}
										setCatScrollingId={setCatScrollingId}
										сatScrollingId={сatScrollingId}
									/>
									<section
										className="Page container content"
										style={{
											backgroundImage: `url(${generalData.mainPage_bg})`,
										}}
									>
										<h1
											className="Page--title"
											dangerouslySetInnerHTML={{
												__html:
													generalData.mainPage_title,
											}}
										/>
										<div
											className="content-wrap"
											dangerouslySetInnerHTML={{
												__html:
													generalData.mainPage_content,
											}}
										/>
										{/* <hr/> */}
									</section>
								</>
							)}
						/>

						{/* page */}
						{/* {['/kejtering-bankety' , '/pitanie-na-predprijatii'].map((path , index)=> <Route  */}
						{pages.map((page: any, index: number) => (
							<Route
								key={index}
								path={"/" + decodeURI(page.post_name)}
								render={(props) => (
									<PageContainer
										// slug.location.pathname
										slug={decodeURI(page.post_name)}
										addToBasketHendler={addToBasket}
										basketItems={basketItems}
										SitePointsList={generalData.SitePoints}
										//
										categories={categories}
										getProduct={getProduct}
										products={products}
										weekIndex={weekIndex}
										timeIndex={timeIndex}
										setCategories={setCategories}
										setSeo={setSeo}
										сatScrollingId={сatScrollingId}
										setCatScrollingId={setCatScrollingId}

										// dayPartIndex='1'
										// category=''
									/>
								)}
							/>
						))}
						<Route
							path="/ComingSoon"
							exact
							render={(props) => <ComingSoon setSeo={setSeo} />}
						/>
						{/* <Route component={NotFound} setSeo={setSeo} /> */}
						<Route
							render={(props) => <NotFound setSeo={setSeo} />}
						/>
					</Switch>
					<div className="container">
						<hr />
					</div>

					<Route
						path="/"
						exact
						render={(props: any) => (
							<SitePoints items={generalData.SitePoints} />
						)}
					/>
					<Route
						path="/"
						exact
						render={(props: any) => <HowToOrder />}
					/>
					<Route
						path="/"
						exact
						render={(props: any) => (
							<DeliveryTerms
								items1={generalData["DeliveryTerms--items1"]}
								items2={generalData["DeliveryTerms--items2"]}
								items3={generalData["DeliveryTerms--items3"]}
							/>
						)}
					/>

					{/* <Route path='/order' exact render={(props) => (
							<OrderForm 
								basketItems={basketItems}
							/>
						)}/> */}

					<Route
						path="/"
						exact
						render={(props) => (
							<MobileApps
								title="10%"
								text="СКИДКА при заказе <br> С МОБИЛЬНОГО приложения <br> (в разработке)"
								linkAppStore="https://play.google.com/store/apps/details?id=com.google.earth"
								linkGooglePlay="https://play.google.com/store/apps/details?id=com.google.earth"
							/>
						)}
					/>

					{/* <Reviews 
						/> */}

					{/* <Route
						path="/"
						exact
						render={(props) => (
							<OurCients
								title="Наши клиенты:"
								items={generalData.our_cients}
							/>
						)}
					/> */}
				</main>

				<Footer
					socki={generalData.socki}
					menu1Title={`Доставка еды:`}
					menu2Title={`Спец. предложения:`}
					menu3Title={`Контакты:`}
				/>

				{/* <Psd /> */}
			</div>
		</Router>
	);
};

export default App;
