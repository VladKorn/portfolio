import React, { useState, useEffect } from "react";
import { SelectProps } from "antd/es/select";
import { Input, AutoComplete } from "antd";

function getRandomInt(max: number, min: number = 0) {
	return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

interface Props {
	setProduct: any;
}

const InputSearch = (props: Props) => {
	const [products, setProducts] = useState<Array<Product>>([]);
	const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
	const [query, setQuery] = useState<string>("");

	const searchResult = async (query: string) => {
		return await fetch(`https://magday.ru/api/search.php`, {
			method: "post",
			body: JSON.stringify({ query: query }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("search res", res);
				if (res.success) {
					setProducts(res.products);
					return res.products.map((item: Product, idx: any) => {
						return {
							value: item.name,
							label: (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<span>{item.name}</span>
									{/* <span>{getRandomInt(200, 100)} results</span> */}
								</div>
							),
						};
					});
				} else {
					return null;
				}
			});
	};
	useEffect(() => {
		// console.log("useEffect");
		const timer = setTimeout( async() => {
			// console.log("setTimeout");
			setOptions(query ? await searchResult(query) : []);
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [query]);

	const handleSearch = async (value: string) => {
		setQuery(value);
	};

	const onSelect = (value: string) => {
		const selectedProduct = products.filter(
			(item) => item.name === value
		)[0];
		console.log("onSelect", value, selectedProduct);
		props.setProduct(selectedProduct);
	};

	return (
		<AutoComplete
			dropdownMatchSelectWidth={252}
			style={{ width: 300 }}
			options={options}
			onSelect={onSelect}
			onSearch={handleSearch}
		>
			<Input.Search
				size="middle"
				placeholder="search product"
				enterButton
			/>
		</AutoComplete>
	);
};

export default InputSearch;
