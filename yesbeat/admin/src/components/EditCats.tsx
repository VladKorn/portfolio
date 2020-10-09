import React, { useState, useEffect } from "react";
// import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
// import CategoryDialog from "./categoryDialog";
// import edit from "./edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import edit from "./edit";

// import { spawn } from "child_process";
// import { InputLabel, Input } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
interface Props {
	categories: Array<Category>;
}
interface Cat {
	name: string;
	id: number;
	cronKeywords: Array<string>;
	// removeItem: (id:number)=>void
}

const EditCats: React.FC<Props> = props => {
	const [cats, setCats] = useState(props.categories);
	console.log("categories", cats);
	const add = async () => {
		// const res = await edit({
		// 	type: "preset",
		// 	action: "add",
		// 	data: {
		// 		name: "",
		// 		sets: []
		// 	}
		// });
		// console.log("res await", res);
		// if (res.preset && res.preset.id) {
		// 	presets.unshift(res.preset);
		// 	const presetsCopy = [...presets];
		// 	setPresets(presetsCopy);
		// }
	};
	const removeItem = (id: number) => {
		// const preset = presets.find(preset => preset.id === id);
		// if(preset){
		//     const index = presets.indexOf(preset);
		//     console.log(preset , index);
		//     if (index !== -1){
		//         presets.splice(index, 1)
		//         const presetsCopy = [...presets];
		//         setPresets(presetsCopy);
		//     };
		// }
	};
	// useEffect(() => {
	// 	console.log('useEffect presets presets presets')
	// }, [presets]);
	// if (!presets) {
	//     return null;
	// }
	return (
		<section id="edit-cats">
			<Button variant="outlined" color="primary" onClick={add} disabled={true}>
				<PlaylistAddIcon /> Add category
			</Button>
			{cats.map(cat => {
				const cronKeywords = JSON.parse(cat.cronKeywords);
				return (
					<Cat
						key={cat.id}
						id={cat.id}
						name={cat.name}
						cronKeywords={cronKeywords}
						// removeItem={removeItem}
					/>
				);
			})}
		</section>
	);
};

export default EditCats;
//
//
const Cat: React.FC<Cat> = props => {
	const [name, setName] = useState(props.name);
	const [cronKeywords, setCronKeywords] = useState(props.cronKeywords);
	const [keyword, setKeyword] = useState("");
	const [isMount, setIsMount] = useState(false);

	useEffect(() => {
		// setIsMount(true);
		if (isMount) {
            console.log("cronKeywords", cronKeywords);
			let timer = setTimeout(() => {
                // const preset = Object.assign({}, props.preset);
                const data = {
                    cronKeywords: cronKeywords
                }
                const res = edit({
                    type: "cat",
                    action: "edit",
                    id: props.id,
                    data: data
                });
                // console.log('asdasd' , res)
               
            }, 1000);
            
			return () => {
				clearTimeout(timer);
			};
		}
	}, [cronKeywords]);
	useEffect(() => {
		setIsMount(true);
	}, []);
	const onSubmit = (event: any) => {
		event.preventDefault();
		cronKeywords.push(keyword);
		const arr = [...cronKeywords];
		setCronKeywords(arr);
		setKeyword("");
	};
	const deleteKeyword = (index: number) => {
		// const index = event.target.dataset.index;
		// console.log("deleteKeyword", index);
		const arr = [...cronKeywords];
		arr.splice(index, 1);
		setCronKeywords(arr);
	};
	return (
		<div className="cat even">
			{/* <div className="delete" onClick={deleteItem}>
				<DeleteForeverIcon fontSize="large" />
			</div> */}
			<TextField
				onChange={event => {
					// setName(event.target.value);
                }}
                disabled={true}
                
				// inputRef={inputEl}
				className="input-cat-name"
				// label="Exclude"
				value={name}
			/>
			<div className="wrap">
				<div className="cat--keyword-wrap">
					{cronKeywords.map((item, index) => {
						return (
							<div key={index} className="cat--keyword">
								<IconButton
									size="small"
									className="cat--keyword-delete"
									onClick={() => {
										deleteKeyword(index);
									}}
								>
									<DeleteForeverIcon fontSize="small" />
								</IconButton>
								<span>
									{" "}
									{item ? item.replace(/ /g, "_") : null}
								</span>
							</div>
						);
					})}
				</div>
				<form action="" onSubmit={onSubmit}>
					<TextField
						onChange={event => {
							setKeyword(event.target.value);
						}}
                        // inputRef={inputEl}
						className="input-add"
						name="keyword"
						label="add keyword"
						value={keyword}
					/>
				</form>
			</div>

			{/* <CategoryDialog
				handleClose={() => {}}
				handleChange={onCatsChenge}
				isOpen={false}
				categories={props.categories}
				productCategories={sets}
			/> */}
		</div>
	);
};
