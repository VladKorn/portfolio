import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteUrl } from "../../xxxx.js";

// import logo from "../../images/logo.png";
import "./index.css";

interface Props {
	socki: any;
	menu1Title: string;
	menu2Title: string;
	menu3Title: string;
}
const logo = process.env.PUBLIC_URL+"/images/logo.png";

const Footer = (props: Props) => {
	const [menu1, setMenu1] = useState([]);
	const [menu2, setMenu2] = useState([]);
	const [menu3, setMenu3] = useState([]);
	useEffect(() => {
		fetch(`${siteUrl}wp-json/vladkorn/menus/footer_menu1`)
			.then((res) => res.json())
			.then((res) => {
				// console.log('footer_menu1',res)
				let data: any = [];
				res.forEach((item: any) => {
					let url = item.url.replace(siteUrl, "");
					data.push({
						title: item.title,
						link: url,
					});
				});
				setMenu1(data);
				// this.setState({menu1: data});
			});
		fetch(`${siteUrl}wp-json/vladkorn/menus/footer_menu2`)
			.then((res) => res.json())
			.then((res) => {
				let data: any = [];
				res.forEach((item: any) => {
					data.push({
						title: item.title,
						link: item.url.replace(siteUrl, ""),
					});
				});
				setMenu2(data);
			});
		fetch(`${siteUrl}wp-json/vladkorn/menus/footer_menu3`)
			.then((res) => res.json())
			.then((res) => {
				let data: any = [];
				res.forEach((item: any) => {
					data.push({
						title: item.title,
						link: item.url.replace(siteUrl, ""),
					});
				});
				setMenu3(data);
			});
	}, []);

	return (
		<footer>
			<div className="container">
				<div className="first-wrap">
					<Link to="/" className="logo-wrap">
						<img src={logo} alt="" />
						<span>Еда на каждый день!</span>
					</Link>
				</div>
				<div className="menus-wrap">
					<div className="menu-wrap">
						<span className="Footer--menu-title">
							{props.menu1Title}
						</span>
						<ul className="line-list">
							{menu1.map((item: any, index) => (
								<li key={index}>
									<Link to={"/"+item.link}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="menu-wrap">
						<span className="Footer--menu-title">
							{props.menu2Title}
						</span>
						<ul className="line-list line-list--color2">
							{menu2.map((item: any, index) => (
								<li key={index}>
									<Link to={"/"+item.link}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="menu-wrap">
						<span className="Footer--menu-title">
							{props.menu3Title}
						</span>
						<ul className="line-list line-list--color3">
							{menu3.map((item: any, index) => (
								<li key={index}>
									<Link to={"/"+item.link}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<ul className="socki-wrap">
					{props.socki
						? props.socki.map((item: any, index: number) => (
								<li key={index}>
									<a href={item.link} target="_blank" rel="noopener noreferrer">
										<img src={item.ico} alt="" />
									</a>
								</li>
						  ))
						: ""}
				</ul>
			</div>
		</footer>
	);
};

export default Footer
