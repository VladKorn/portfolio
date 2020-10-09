import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
interface Props {
    presets: Preset[];
    presetId: number;
    setPresetId: (id:number)=>void;
    // addCats: ()=>void;
    
}
const Presets: React.FC<Props> = props => {
	// const [preset, setPreset] = useState<number>(-1);

	const renderPresets = props.presets.map((item: any, index: number) => {
		return (
			<MenuItem key={index} value={item.id}>
				{item.name}
			</MenuItem>
		);
	});

	return (
		<Select
			value={props.presetId}
			onChange={event => {
				const id = event.target.value as number;
                props.setPresetId(id);
                // props.addCats();
			}}
		>
			<MenuItem key={-1} value={-1}>
				Пресеты: свой набор
			</MenuItem>
			{renderPresets}
		</Select>
	);
};
export default Presets;
