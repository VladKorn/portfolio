// import React, { useState } from "react";
const pas = "fa4kgo4TagttHla";
const edit = async (params: Edit) => {
	console.log("func edit", params);
	if (params.type === "products") {
        fetch(`https://yesbeat.ru/admin-api/edit.php`, {
			method: "POST",
			body: JSON.stringify({
				pas: pas,
				action: params.action || "add",
				type: "products",
				data: params.data
			})
		})
			.then(res => res.json())
			.then(res => {
				console.log("edit res", res);
			});
	}

	if (params.type === "user") {
		fetch(`https://yesbeat.ru/admin-api/edit.php`, {
			method: "POST",
			body: JSON.stringify({
				pas: pas,
				action: "edit",
				type: "user",
				id: params.id,
				data: params.data
			})
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
				console.log("edit res", res);
			});
    } //user
    

    if (params.type === "preset") {
		const res = await fetch(`https://yesbeat.ru/admin-api/edit.php`, {
			method: "POST",
			body: JSON.stringify({
				pas: pas,
				action: params.action,
				type: "preset",
				id: params.id,
				data: params.data
			})
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
                console.log("edit Preset res", res);
                return res;
            });
        return res;
    } //preset
    
    if (params.type === "cat") {
		const res = await fetch(`https://yesbeat.ru/admin-api/edit.php`, {
			method: "POST",
			body: JSON.stringify({
				pas: pas,
				action: params.action,
				type: "cat",
				id: params.id,
				data: params.data
			})
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
                console.log("edit cat res", res);
                return res;
            });
        return res;
	} //cat
	// params

	// console.log("editProduct", params.id);
	// fetch(`https://yesbeat.ru/admin-api/index.php`, {
	// 	method: "POST",
	// 	body: JSON.stringify({
	// 		action: "edit",
	// 		type: "product",
	// 		pas: "fa4kgo4TagttHla",
	// 		id: params.id,
	// 		newValues: params.
	// 	})
	// })
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		// const products = res.products;
	// 		console.log("edit res", res);
	// });
	// return;
};
export default edit;
