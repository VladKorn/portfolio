import React  from "react";
import "./index.css";
// import psdimg from '../../images/assets/mag_day_main.png';
// import psdimg from '../../images/assets/mag_day3.png';
// import psdimg from '../../images/assets/mag_day_page.png';
// import psdimg from '../../images/assets/mag_day_product.png';

import psdimg from "../../images/assets/m1.jpg";

const Psd = () => {
	const handleClick = () => {
		console.log("Click happened");
		let psd = document.querySelector(".psd");
		psd?.classList.toggle("is-active");
	};
	return (
		<div>
			<div className="psd">
				<img src={psdimg} alt="" />
			</div>
			<button className="asd" onClick={handleClick}></button>
		</div>
	);
};
export default Psd;
