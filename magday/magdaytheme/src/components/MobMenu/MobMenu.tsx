import React from "react";
import NavByPages from "./../NavByPages/NavByPages";
import NavByCategory from "./../NavByCategory/NavByCategory";

import "./index.css";
interface Props {
	isOpen: boolean;
	setIsOpeen: (val: boolean) => void;
	menuPrimary: any;
	categories: any;
	сatScrollingId: number;
	setCatScrollingId: (val: number) => void;
}

const MobMenu = (props: Props) => {
	let className = ``;
	if (props.isOpen) {
		className += `isOpen `;
	}
	return (
		<aside
			id="MobMenu"
			className={className}
			onClick={() => {
				props.setIsOpeen(false);
			}}
		>
			<div className="hide-large aside-top">
				<button
					type="button"
					className="close"
					onClick={() => {
						props.setIsOpeen(false);
					}}
				>
					<span>
						<i></i>
						<i></i>
					</span>
				</button>
				<NavByPages items={props.menuPrimary} />
			</div>
			<NavByCategory
				items={props.categories}
				catScrollingId={props.сatScrollingId}
			/>
			{/* <ul>
						{this.state.categories.map((category, index) => (
							<li><img src={category.img} alt={category.name}/><span>{category.name}</span></li>
						))}
					</ul> */}
		</aside>
	);
};

export default MobMenu;
