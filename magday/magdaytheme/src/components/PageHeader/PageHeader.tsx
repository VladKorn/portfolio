import React from "react";
import "./index.css";
interface Props {
	headerBg?: string;
	title: string;
	headerDescriotion?: string;
}

const PageHeader = (props: Props) => {
	return (
		<section
			className="PageHeader"
			style={{ backgroundImage: `url(${props.headerBg})` }}
		>
			<div className="container">
				<h1
					className="PageHeader--title"
					dangerouslySetInnerHTML={{ __html: props.title }}
				/>
				{props.headerDescriotion && (
					<p
						className="PageHeader--descriotion"
						dangerouslySetInnerHTML={{
							__html: props.headerDescriotion,
						}}
					/>
				)}
			</div>
		</section>
	);
};
export default PageHeader;
