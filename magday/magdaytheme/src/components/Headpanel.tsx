import React, { useState } from "react";
import "./index.css";
// const initialIsOpen = localStorage.HeadpanelisOpen === "false" ? false : true;
const initialIsOpen = false;
interface Props {
	message: string;
	description: string;
}
const Headpanel = (props: Props) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen);
	const clickHandker = () => {
		setIsOpen(false);
		localStorage.HeadpanelisOpen = false;
	};
	if (isOpen) {
		return (
			<div className="head-panel">
				<div className="container">
					<span dangerouslySetInnerHTML={{ __html: props.message }} />
					<span className="star"></span>
					<span
						dangerouslySetInnerHTML={{
							__html: props.description,
						}}
					/>
					<a className="button" href="/">
						Условия доставки
					</a>
					<button className="hide" onClick={clickHandker}>
						Скрыть
					</button>
				</div>
			</div>
		);
	}
	return null;
};

export default Headpanel;
