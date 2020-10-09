import React, { useState, useEffect, useRef } from "react";
// import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import CategoryDialog from "./categoryDialog";
import edit from "./edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
interface Props {
	presets: Array<Preset>;
	categories: Array<Category>;
}
interface PropsPreset {
	categories: Array<Category>;
    preset: Preset;
    removeItem: (id:number)=>void
}

const EditPresets: React.FC<Props> = props => {
	console.log("presets", props.presets);
	const [presets, setPresets] = useState(props.presets);

	const add = async () => {
		const res = await edit({
			type: "preset",
			action: "add",
			data: {
				name: "",
				sets: []
			}
		});
		console.log("res await", res);
		if (res.preset && res.preset.id) {
			presets.unshift(res.preset);
			const presetsCopy = [...presets];
			setPresets(presetsCopy);
		}
    };
    const removeItem = (id:number)=>{
        const preset = presets.find(preset => preset.id === id);
        if(preset){
            const index = presets.indexOf(preset);
            console.log(preset , index);
            if (index !== -1){ 
                presets.splice(index, 1)
                const presetsCopy = [...presets];
                setPresets(presetsCopy);
            };
        }
    }
	// useEffect(() => {
	// 	console.log('useEffect presets presets presets')
	// }, [presets]);
	// if (!presets) {
	//     return null;
	// }
	return (
		<section id="edit-presets">
			<Button variant="outlined" color="primary" onClick={add}>
				<PlaylistAddIcon /> Add preset
			</Button>
			{presets.map(preset => {
				return (
					<Preset
                        removeItem={removeItem}
						key={preset.id}
						preset={preset}
						categories={props.categories}
					/>
				);
			})}
		</section>
	);
};

export default EditPresets;
//
//
const Preset: React.FC<PropsPreset> = props => {
    const [value, setValue] = useState(props.preset.name);
    const [sets, setSets] = useState(props.preset.sets);
    
	const [isMount, setIsMount] = useState(false);
	const editPreset = (preset:Preset) => {
		edit({
			type: "preset",
			action: "edit",
			id: props.preset.id,
			data: preset
        });
	};
    const deleteItem = ()=>{
        edit({
			type: "preset",
			action: "delete",
			id: props.preset.id,
        });
        props.removeItem(props.preset.id);

        // setSets();
    }
    const onCatsChenge = (value:Array<number>)=>{
        // console.log('value' , value);
        setSets(value);
    }
	useEffect(() => {
		if (isMount) {
			// console.log("useEffect value", value);
			let timer = setTimeout(() => {
                const preset = Object.assign({}, props.preset);
                preset.name = value;
                preset.sets = sets;
                editPreset(preset);
            }, 1000);
            
			return () => {
				clearTimeout(timer);
			};
		}
	}, [value , sets]);
	useEffect(() => {
		setIsMount(true);
	}, []);
	return (
		<div className="preset">
			<div className="delete" onClick={deleteItem}>
				<DeleteForeverIcon fontSize="large" />
			</div>
			<TextField
				onChange={event => {
					setValue(event.target.value);
				}}
				// inputRef={inputEl}
				className="input-preset-name"
				// label="Exclude"
				value={value}
			/>
			<CategoryDialog
				handleClose={() => {}}
				handleChange={onCatsChenge}
				isOpen={false}
				categories={props.categories}
				productCategories={sets}
			/>
		</div>
	);
};
