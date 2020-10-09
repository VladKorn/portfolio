import React from "react";
import "./index.css";

interface Props {
	items: any;
	catScrollingId: number;
}

const NavByCategory = (props: Props) => {
	const scrolTo = (event: any) => {
		let id = event.target.dataset.termid;
		if(!id){
			id = event.target.closest(`li`).dataset.termid
		}
		console.log("#categoryTitleId" + id);
		const titleSelector = "#categoryTitleId" + id;
		const titleEl = document.querySelector<HTMLElement>(titleSelector);
		if (titleEl) {
			let pos = titleEl.style.position;
			let top = titleEl.style.top;
			titleEl.style.position = "relative";
			titleEl.style.top = "-120px";
			titleEl.scrollIntoView({ behavior: "smooth", block: "start" });
			titleEl.style.top = top;
			titleEl.style.position = pos;
			console.log(titleEl);
		}
	};
	return (
		<section className="NavByCategory container">
			<ul className="NavByCategory--list">
				{props.items.map((item: any, index: number) => (
					<li
						className={props.catScrollingId === item.term_id ?"isActive":""}
						key={index}
						onClick={scrolTo}
						data-termid={item.term_id}
					>
						<img src={item.img||""} alt={item.name} />
						<span>{item.name}</span>
					</li>
				))}
			</ul>
		</section>
	);
};

export default NavByCategory;
