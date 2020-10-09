import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Info from 'luxon/src/info.js'
import { DateTime } from "luxon";

import "./index.css";

interface Props {
	clickHandler: any;
	mode?: "compact";
	weekIndex: number;
	DateTime: any;
	menuIsReady: boolean;
}

const saturday = "Суббота";
const sunday = "Воскресенье";

// const saturday = "Сб.";
// const sunday = "Вс.";

const _initilal_items = [
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	saturday,
	sunday,
];
const initialWeekday = DateTime.local().weekday;
const items = [
	..._initilal_items.slice(initialWeekday - 1),
	..._initilal_items.slice(0, initialWeekday - 1),
]
const NavByWeek = (props: Props) => {
	// const initialWeekday = props.DateTime.weekday;
	// const initialWeekday = 1;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(_initilal_items[initialWeekday]);
	const [text, setText] = useState("");
	// const [items, setItems] = useState(_items);
	const [dates, setDates] = useState([
		"--",
		"--",
		"--",
		"--",
		"--",
		"--",
		"--",
	]);
	const todayItem = _initilal_items[initialWeekday - 1];
	// console.log("todayItem", todayItem);
	const clickHandler = (event: any) => {
		let el = event.target;
		if (!el.classList.contains(`jsNavByWeekItem`)) {
			el = el.closest(`.jsNavByWeekItem`);
		}
		if (el.dataset.isenabled === "true") {
			props.clickHandler(_initilal_items.indexOf(el.dataset.item) + 1);
		}
		if (props.mode === "compact") {
			setIsOpen(!isOpen);
			// setState({isOpen: !this.state.isOpen});
		}
	};
	useEffect(() => {
		setSelectedItem(_initilal_items[props.weekIndex - 1]);
	}, [props.weekIndex]);

	useEffect(() => {
		if (
			selectedItem === todayItem &&
			todayItem !== saturday &&
			todayItem !== "Воскресенье"
		) {
			setText("Меню на сегодня");
		} else {
			if (
				(selectedItem === sunday || selectedItem === saturday) &&
				(todayItem === sunday || todayItem === saturday)
			) {
				setText("Предзаказ на неделю");
			} else {
				if (selectedItem !== todayItem) {
					setText("Предзаказ на");
				}
			}
		}
		if (!props.menuIsReady) {
			setText("Меню в разработке");
		}
	}, [selectedItem, props.menuIsReady, todayItem]);
	useEffect(() => {
		let firstDayDateTime = DateTime.local().minus({
			days: initialWeekday - 1,
		});
		let dates: any = [];
		items.forEach((item, index) => {
			dates[index] = firstDayDateTime
				.plus({ days: index })
				.toFormat("dd LL")
				.replace(" ", ".");
		});
		setDates(dates);
		// start from today
		// const firstIndex = items.indexOf(todayItem);
		// console.log("firstIndex", DateTime.local().weekday);
		// console.log("firstIndex", DateTime.weekday);
		// console.log("firstIndex", DateTime.weekday);
		// if (todayItem === saturday || todayItem === sunday) {
		// }
	}, []);

	// const isEnabled = true

	const renderList = () => {
		return items.map((item: string, index) => (
			<Item
				index={index}
				initialWeekday={initialWeekday}
				key={item}
				item={item}
				todayItem={todayItem}
				selectedItem={selectedItem}
				text={text}
				clickHandler={clickHandler}
				date={dates[index]}
			/>
		));
	};
	let className = `NavByWeek `;
	if (isOpen) {
		className += `isOpen `;
	}
	if (!props.menuIsReady) {
		className += `notReady`;
	}
	return (
		<div className={className}>
			<div className="container">
				{props.menuIsReady ? (
					<>
						<ul>{renderList()}</ul>
						<a
							href="/menu.xlsx"
							download
							className="link-xml"
							target="_blank"
						>
							Скачать меню в .exl
						</a>
					</>
				) : (
					<>
						<Item
							index={9}
							initialWeekday={initialWeekday}
							key={"notReady"}
							item={todayItem}
							todayItem={todayItem}
							selectedItem={todayItem}
							text={text}
							clickHandler={clickHandler}
							date={dates[items.indexOf(todayItem)]}
						/>
						<p className="not-ready-text">
							Меню на неделю еще не составлено, загляните позже!
						</p>

						<a
							href="/menu.xlsx"
							download
							className="link-xml"
							target="_blank"
						>
							Напомнить
						</a>
					</>
				)}
				<div
					className="open hide-large"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					+
				</div>
			</div>
		</div>
	);
};

export default NavByWeek;

interface ItemProps {
	index: number;
	initialWeekday: number;
	item: string;
	todayItem: string;
	selectedItem: string;
	text: string;
	date: string;
	clickHandler: any;
}
const Item = (props: ItemProps) => {
	const {
		// index,
		// initialWeekday,
		item,
		todayItem,
		selectedItem,
		clickHandler,
		text,
		date,
	} = props;
	const isEnabled = () => {
		if (todayItem !== item) {
			if (item === saturday || item === sunday) {
				return false;
			}
		}
		// if (index < initialWeekday - 1) {
		// 	return false;
		// }
		// console.clear();
		// console.log("index" , index , initialWeekday);

		return true;
	};
	const asd = isEnabled();
	return (
		<li
			className="jsNavByWeekItem"
			data-item={item}
			data-isenabled={asd}
			data-istoday={item === todayItem ? "true" : "false"}
			data-isselected={item === selectedItem ? "true" : "false"}
			onClick={clickHandler}
		>
			{item === selectedItem ? <span className="spt">{text}</span> : null}
			{item === saturday && todayItem !== saturday
				? "Cб."
				: item === sunday && todayItem !== sunday
				? "Вс."
				: item}
			{/* {todayIsweekend ? : item} */}
			<span>{date}</span>
		</li>
	);
};
