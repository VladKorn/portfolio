import React, { useState, useEffect } from "react";
import { restUrl } from "../../xxxx.js";

import PageHeader from "../PageHeader/PageHeader";

interface Props {
	slug: any;
}

const PageHeaderContainer = (props: Props) => {
	// const [slug, setSlug] = useState(props.slug.location.pathname);
	const slug = props.slug.location.pathname
	const [title, setTitle] = useState(``);
	const [headerDescriotion, setHeaderDescriotion] = useState(``);
	const [headerBg, setHeaderBg] = useState(``);
	useEffect(() => {
		fetch(`${restUrl}pages/?slug=${slug}`)
			.then((res) => res.json())
			.then((res) => {
				let data = res[0];
				console.log(
					"PageHeaderContainer data",
					`${restUrl}pages/?slug=${slug}`
				);
				setTitle(data.acf["header--title"]);
				setHeaderDescriotion(data.acf["header--description"]);
				setHeaderBg(data.acf["header--bg"]);
			});
	}, []);
	return (
		<PageHeader
			title={title}
			headerDescriotion={headerDescriotion}
			headerBg={headerBg}
		/>
	);
};
export default PageHeaderContainer;