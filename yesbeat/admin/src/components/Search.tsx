import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
interface Props {
	searchText: string;
	setSearchText: (searchText: string) => void;
}


const Search: React.FC<Props> = (props: Props) => {
	const [searchText, setSearchText] = useState("");
	const inputEl: any = useRef(null);
	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("useEffect");
			props.setSearchText(searchText);
		}, 300);
		return () => clearTimeout(timer);
    });
	useEffect(() => {
        runOnKeys(() => {
            console.log('focus');
            inputEl.current.focus();
        }, "ControlLeft", "KeyF");
    } , []);

    const runOnKeys = (func:any, ...codes:any) =>{
        let pressed = new Set();
        document.addEventListener("keydown", function(event) {
            // console.log('event.code' , event.code);
            pressed.add(event.code);
            for (let code of codes) {
                if (!pressed.has(code)) {
                    return;
                }
            }
            pressed.clear();
            func();
        });
        document.addEventListener("keyup", function(event) {
            pressed.delete(event.code);
        });
    }

    
	const onButtonClick = () => {
		// `current` points to the mounted text input element
		inputEl.current.focus();
	};
	return (
		<>
			<TextField
				onChange={event => {
					setSearchText(event.target.value);
                }}
				inputRef={inputEl}
				className="search"
				label="Search"
				value={searchText}
			/>
		</>
	);
};
export default Search;
