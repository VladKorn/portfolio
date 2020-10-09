import React, {  useState, useEffect } from "react";
import { AsYouType, CountryCode } from "libphonenumber-js";

interface Props {
	countryCode?: CountryCode;
	onChange: (val: string) => void;
}
const MAX = 17;

const PhoneInput = (props: Props) => {
	const countryCode = props.countryCode || "RU";

	const [value, setValue] = useState("+7");
	// const formmat = (value: string) => {
	// 	let out = value;
	// 	if (value[0] !== "+") {
	// 		// out = "+" + value;
	// 	}
	// 	if (countryCode === "RU") {
	// 		// if (asYouType.country !== countryCode) {
	// 		// }
	// 	}
	// 	return out;
	// };
	const onChange = (event: any) => {
		const asYouType = new AsYouType(countryCode);
		console.log("event", event.target.value);
		let val = event.target.value;
		let _val = asYouType.input(val);
		// console.log("event value", val);
		// console.log("phoneNumber", asYouType);
		setValue(_val);
	};
	useEffect(() => {
		if (value.length > MAX) {
			setValue(value.slice(0, MAX));
		}
		if (value[0] !== "+") {
			setValue("+" + value);
		}
		props.onChange(value);
	}, [value]);
	return (
		<span className="PhoneInput">
			<input
				type="text"
				id="phone-mask"
				className="input"
				value={value}
				onChange={onChange}
			/>
		</span>
	);
};
export default PhoneInput;
