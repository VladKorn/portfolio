import React, { useState  , useEffect} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import edit from "./edit";
import CloseIcon from '@material-ui/icons/Close';
import Presets from "./Presets";

interface Props {
	categories: Category[];
    productOnPageIds: Array<number>;
    presets: Preset[];
    reloadProducts: ()=> void;
}
const EditPanel: React.FC<Props> = props => {
	const [categoryId, setCategoryId] = useState<number>(-1);
	const [presetId, setPresetId] = useState<number>(-1);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const addCat = () => {
        if(categoryId>0){
            edit({
                type: "products",
                action: "edit",
                id: props.productOnPageIds,
                data: {
                    categoryIds: [categoryId],
                    productsIds: props.productOnPageIds
                }
            });
        }
        props.reloadProducts();
    };
    const deleteCat = () => {
        if(categoryId>0){
            edit({
                type: "products",
                action: "delete",
                id: props.productOnPageIds,
                data: {
                    categoryIds: [categoryId],
                    productsIds: props.productOnPageIds
                }
            });
        }
        props.reloadProducts();
    };
    const addCats = () => {
        const preset:any = props.presets.filter(x=>x.id === presetId)[0];
        if(preset){
            let categoryIds:Array<any> = preset.sets;
            edit({
                type: "products",
                action: "edit",
                id: props.productOnPageIds,
                data: {
                    categoryIds: categoryIds,
                    productsIds: props.productOnPageIds
                }
            });
        }
        props.reloadProducts();
    };

    const deleteCats = () => {
        const preset:any = props.presets.filter(x=>x.id === presetId)[0];
        if(preset){
            let categoryIds:Array<any> = preset.sets;
            edit({
                type: "products",
                action: 'delete',
                id: props.productOnPageIds,
                data: {
                    categoryIds: categoryIds,
                    productsIds: props.productOnPageIds
                }
            });
        }
        props.reloadProducts();
    };
    // useEffect(() => {
    //     addCat();
    // }, [categoryId]);
    // useEffect(() => {
    //     addCats();
    // }, [presetId]);
	const renderCategories =
		<div className="EditPanel--categories">
			<Select
				value={categoryId}
				onChange={event => {
					const id = event.target.value as number;
                    setCategoryId(id);
                    console.log('setCategoryId' , id);
                    // addCat();
				}}
			>
				<MenuItem key={-1} value={-1}>
					Категории
				</MenuItem>
				{props.categories.map((item: Category, index) => (
					<MenuItem key={index} value={item.id}>
						{item.id} - {item.name}
					</MenuItem>
				))}
			</Select>
		</div>
	
	return (
		<div id="edit-panel" className={isOpen ? 'is-open' : ''}>
			<div className="hidden">
				<div className="control-wrap">
					{renderCategories}
                    <div className="control-wrap--buttons">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={deleteCat}
                        >
                            Удалить
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addCat}
                        >
                            Добавить
                        </Button>
                    </div>
				</div>
				<div className="control-wrap">
                    <Presets
                        presets={props.presets}
                        presetId={presetId}
                        setPresetId={setPresetId}
                        // addCats={addCats}
                     />
                    <div className="control-wrap--buttons">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={deleteCats}
                        >
                            Удалить
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addCats}
                        >
                            Добавить
                        </Button>
                    </div>
				</div>
			</div>
			{!isOpen ? <div className="open" title='edit all items on page' onClick={()=>{setIsOpen(true)}}></div> : null}
			{isOpen ? <CloseIcon className="close" onClick={()=>{setIsOpen(false)}}/> : null}
		</div>
	);
};
export default EditPanel;
