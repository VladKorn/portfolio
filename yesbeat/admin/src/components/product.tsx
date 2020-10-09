import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

// import ReactPlayer from 'react-player';
import Player from "./player";
import ProductCategories from "./productCategories";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

interface State {
	name: string;
	title: string;
	type: string;
	productCategories: Array<number>;
	disabledOnSites: Array<number>;
	disableForCronCatByName: boolean;
}

export default class product extends Component<any, State> {
	state = {
		name: this.props.name,
		title: this.props.title,
		type: this.props.type,
		productCategories: this.props.categories_ids,
		disabledOnSites: this.props.disabledOnSites,
		disableForCronCatByName: this.props.disableForCronCatByName
	};
	editTimer: any = null;
	newValues: editProduct = {};
	componentDidUpdate(prevProps: any, prevState: State) {
		console.log(
			"componentDidUpdate",
			this.editTimer,
			this.newValues,
			"==",
			prevState.disabledOnSites,
			this.state.disabledOnSites
		);
		clearTimeout(this.editTimer);
		if (prevState.name !== this.state.name) {
			this.newValues["name"] = this.state.name;
		}
		if (prevState.title !== this.state.title) {
			this.newValues["title"] = this.state.title;
		}
		if (prevState.type !== this.state.type) {
			this.newValues["type"] = this.state.type;
		}
		if (prevState.productCategories !== this.state.productCategories) {
			this.newValues["productCategories"] = this.state.productCategories;
		}
		if (
			prevState.disabledOnSites.length !==
			this.state.disabledOnSites.length
		) {
			this.newValues["disable_on_sites"] = this.state.disabledOnSites;
		}
		if (
			prevState.disableForCronCatByName !==
			this.state.disableForCronCatByName
		) {
			this.newValues[
				"disableForCronCatByName"
			] = this.state.disableForCronCatByName;
		}

		this.editTimer = setTimeout(() => {
			if (
				this.newValues["name"] ||
				this.newValues["title"] ||
				this.newValues["type"] ||
				this.newValues["disable_on_sites"] ||
				this.newValues["disableForCronCatByName"] === false ||
				this.newValues["disableForCronCatByName"] ||
				this.newValues["productCategories"]
			) {
				// newValues.import_upd
				this.editProduct(this.props.id, this.newValues);
				this.newValues = {};
			}
		}, 500);
	}
	editProduct(id: number, newValues: any) {
		console.log("editProduct", id, newValues);
		fetch(`https://yesbeat.ru/admin-api/edit.php`, {
			method: "POST",
			body: JSON.stringify({
				action: "edit",
				type: "product",
				pas: "fa4kgo4TagttHla",
				id: id,
				newValues: newValues
			})
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
				console.log("edit res", res);
			});
	}
	handlerChangeCategories(ids: Array<number>) {
		// console.log("handlerChangeCategories ", ids);
		this.setState({ productCategories: ids });
	}
	handleSitesChange(id: number) {
		let arr = [...this.state.disabledOnSites];
		if (arr.includes(id)) {
			arr.splice(arr.indexOf(id), 1);
			this.setState({ disabledOnSites: arr });
		} else {
			arr.push(id);
			this.setState({ disabledOnSites: arr });
		}

		console.log(id);
	}
	renderSites() {
		return (
			<div className="product--sites">
				{this.props.sites.map((item: any) => {
					const checked = this.state.disabledOnSites.includes(
						item.id
					);
					return (
						<div
							key={item.id}
							className="product--site"
							title="Disable on this site"
						>
							<FormControlLabel
								value={item.name}
								control={
									<Checkbox
										indeterminate
										checked={checked}
										onChange={() => {
											this.handleSitesChange(item.id);
										}}
									/>
								}
								label={item.name}
								labelPlacement="end"
							/>
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		const songs = this.props.songs
			? this.props.songs.map((item: any) => {
					return {
						position: item.position,
						songName: item.name,
						songUrl: `https://yesbeat.ru/files/mp3/${this.props.id}/${item.filename}`
					};
			  })
			: null;
		// console.log('songs' ,songs);
		return (
			<div className="product item">
				<div
					className=""
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start"
					}}
				>
					<Link
						target="_blank"
						href={`https://yesbeat.ru/simpla/index.php?module=ProductAdmin&id=${this.props.id}`}
					>
						{this.props.id}
					</Link>
					<TextField
						onChange={event => {
							this.setState({ name: event.target.value });
						}}
						className="product--name"
						// className={classes.root}
						label="Name"
						value={this.state.name}
					/>
					<TextField
						onChange={event => {
							this.setState({ title: event.target.value });
						}}
						className="product--title"
						label="Title"
						value={this.state.title}
					/>
					<TextField
						onChange={event => {
							this.setState({ type: event.target.value });
						}}
						className="product--type"
						label="Type"
						value={this.state.type}
					/>
					{this.renderSites()}
					<hr />
				</div>
				<ProductCategories
					openEditPresets={this.props.openEditPresets}
					openEditCats={this.props.openEditCats}
					productCategories={this.state.productCategories}
					categories={this.props.categories}
					presets={this.props.presets}
					handlerChangeCategories={this.handlerChangeCategories.bind(
						this
					)}
				>
                    <div className="" style={{ display: 'flex',paddingLeft: '70px'}} title="disableForCronCatByName">
					<FormControlLabel
						value={this.state.disableForCronCatByName}
						control={
							<Checkbox
								indeterminate
								checked={this.state.disableForCronCatByName}
								onChange={() => {
									this.setState({
										disableForCronCatByName: !this.state
											.disableForCronCatByName
									});
								}}
							/>
						}
						label={"disable for cron cat by name"}
						labelPlacement="end"
					/>
				</div>
                </ProductCategories>
				
				<div className="product--player">
					{songs.length > 0 ? (
						<Player
							songs={songs}
							id={this.props.id}
							setFocusedPlaylistId={
								this.props.setFocusedPlaylistId
							}
							isFocusedPlaylist={this.props.isFocusedPlaylist}
						></Player>
					) : null}
				</div>
			</div>
		);
	}
}
