import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import Fab from "@material-ui/core/Fab";
// import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryDialog from "./categoryDialog";
// const Dialog = SimpleDialogDemo();
interface Preset {
	sets: Array<number>;
	id: number;
	name: string;
}
interface Props {
	productCategories: Array<number>;
	presets: Array<Preset>;
	categories: Array<any>;
	handlerChangeCategories: any;
    openEditPresets: () => void;
    openEditCats: () => void;
                    
                    
    
}

interface State {
	productCategories: Array<number>;
	isOpen: boolean;
	preset: number;
}

interface cat {
	id: number;
	name: string;
}

export default class ProductCategories extends Component<Props, State> {
	state = {
		productCategories: [-1],
		isOpen: false,
		preset: -1
	};
	// this.handleClose = this.handleClose.bind(this);
	componentDidMount() {
		this.setState({
			productCategories: this.props.productCategories
		});
	}
	setPreset(val: any) {
		const id = parseInt(val.target.value);
		if (id) {
			const preset = this.props.presets.find(x => x.id === id);
			if (preset) {
				console.log("setPreset", preset);
				this.setState({ productCategories: preset.sets });
				this.setState({ preset: id });
				this.props.handlerChangeCategories(preset.sets);
			}
		}
	}

	addCat() {
		this.setState({ isOpen: true });
	}
	handleCloseDialog() {
		console.log("this", this);
		this.setState({ isOpen: false });
		// this.setState({isOpen:false});
	}
	// handleChange(ids:Array<number>){
	// 	this.setState({ productCategories: ids});
	// }
	renderPresets() {
		return (
			<Select
				value={this.state.preset}
				onChange={(val: any) => {
					this.setPreset(val);
				}}
				// displayEmpty
				// className={classes.selectEmpty}
			>
				<MenuItem key={-1} value={-1}>
					Пресеты: свой набор
				</MenuItem>
				{this.props.presets.map((item: any, index: number) => {
					return (
						<MenuItem key={index} value={item.id}>
							{item.name}
						</MenuItem>
					);
				})}
			</Select>
		);
	}

	render() {
		return (
			<div className="product--categories">
				<div className="product--presets-wrap">
					<Button
                        title="edit presets"
						onClick={() => {
							this.props.openEditPresets();
						}}
					>
						<SettingsIcon color="primary"></SettingsIcon>
					</Button>
					{this.renderPresets()}
				</div>
			
				<div className="" style={{ display: "flex" , alignItems: 'flex-start' }}>
					<Button
                        title="edit categories"
						onClick={() => {
							this.props.openEditCats();
						}}
					>
						<SettingsIcon color="primary"></SettingsIcon>
					</Button>
					<CategoryDialog
						handleClose={this.handleCloseDialog.bind(this)}
						// handleChange={this.props.handlerChangeCategories}
						handleChange={(ids: Array<number>) => {
							this.props.handlerChangeCategories(ids);
						}}
						isOpen={this.state.isOpen}
						categories={this.props.categories}
						productCategories={this.props.productCategories}
					/>
				</div>
                {this.props.children}
			</div>
		);
	}
}
