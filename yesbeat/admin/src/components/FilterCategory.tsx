// tsrafc
import React from 'react'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface Props {
	categories: Category[];
    setFilterCategoryId: (id:number)=>void;
    filterCategoryId: number;
}

const FilterCategory: React.FC<Props> = (props) => {
    return (
        <Select
            className="filter-category"
            value={props.filterCategoryId}
            onChange={event => {
                const id = event.target.value as number;
                props.setFilterCategoryId(id);
                console.log('setFilterCategoryId' , id);
            }}
        >
            <MenuItem key={-1} value={-1}>
                Все категории
            </MenuItem>
            {props.categories.map((item: Category, index) => (
                <MenuItem key={index} value={item.id}>
                    {item.id} - {item.name}
                </MenuItem>
            ))}
        </Select>
    )
}
export default FilterCategory;