import React, { Component } from "react";
// import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import Chip from '@material-ui/core/Chip';
interface Props {
	categories: Array<any>;
	isOpen: boolean;
	handleClose: any;
	handleChange: any;

	productCategories: Array<number>;
}
interface State {}

export default class categoryDialog extends Component<Props, State> {
	state = {
		// isOpen: false
	};
	handleClose() {
		this.props.handleClose();
	}
	getCatName(id: number) {
        const cat = this.props.categories.find(x => x.id === id);
		if (cat && cat.name) {
			return cat.name;
		} else {
			return "no name";
		}
	}

	render() {
		return (
			<Select
				multiple
				value={this.props.productCategories}
				onChange={event => {
					this.props.handleChange(event.target.value);
				}}
				
				renderValue={selected => (
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							maxWidth: "400px"
						}}
					>
						{(selected as number[]).map(value => (
                            value > 0 ? 
							<span key={value} className="categori-label">
								{value}: {this.getCatName(value)}
							</span>:null
						))}
					</div>
				)}
			>
				{this.props.categories.map(item => (
                    item.id > 0 ?
					<MenuItem
						key={item.id}
						value={item.id}
					>
						{item.id}: {item.name}
					</MenuItem> : null
				))}
			</Select>
			// </Dialog>
		);
	}
}
