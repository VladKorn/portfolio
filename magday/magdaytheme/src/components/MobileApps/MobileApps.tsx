import React from "react";
// import bg from "../../images/assets/MobileApps__bg.png";
// import linkAppStore from "../../images/linkAppStore.png";
// import linkGooglePlay from "../../images/linkGooglePlay.png";
import phone from "./phone.webp";
import linkAppStore from "./linkAppStore.webp";
import linkGooglePlay from "./linkGooglePlay.webp";

import "./index.css";
interface Props {
	title: string;
	text: string;
	linkAppStore: string;
	linkGooglePlay: string;
}



const MobileApps = (props: Props) => {
	return (
		<section
			className="MobileApps"
		>
			<div className="container">
				<div className="wrap">
					<div className="MobileApps--title">{props.title}</div>
					<p dangerouslySetInnerHTML={{ __html: props.text }} />
					<div className="links-wrap">
						<a  href={props.linkAppStore} target="_blanck">
							<img src={linkAppStore} alt="AppStore" />
						</a>
						<a  href={props.linkGooglePlay} target="_blanck">
							<img src={linkGooglePlay} alt="GooglePlay" />
						</a>
					</div>
				</div>
				<img className="MobileApps--phone" src={phone} alt="" />
			</div>
		</section>
	);
};

export default MobileApps;
