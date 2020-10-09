import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const root = document.getElementById("root");
// if (root?.innerHTML) {
// 	console.log("hydrate");
// 	ReactDOM.hydrate(
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>,
// 		document.getElementById("root")
// 	);
// } else {
	console.log("render");

	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
