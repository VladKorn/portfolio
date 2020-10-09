import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
interface Props {
	items: any;
}
const SitePoints = (props: Props) => {
	if (!props.items) {
		return null;
	}
	return (
		<section className="SitePoints container">
			<ul>
				{props.items.map((item: any, index: number) => (
					<li key={index}>
						<Link to={item.link.url.split(".ru")[1]}>
							<div className="img-wrap">
								<img src={item.img} alt="" />
							</div>
							<span
								dangerouslySetInnerHTML={{
									__html: item.link.title,
								}}
							/>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default SitePoints;
