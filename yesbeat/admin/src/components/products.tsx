import React from "react";
import Product from "./product";
interface State {
	products: Array<any>;
	focusedPlaylistId: number | null;
	presets: Array<any>;
	sites: Array<any>;
}
interface Props {
	categories: Category[];
	currentPage: number;
	setPagination: (params: Pagination) => void;
	setProductOnPageIds: (params: any) => void;
	currentSortIndex: number;
	// setSortListItems:Array<SortListItem|null>;
	setSortListItems: any;
	searchText: string;
    excludeText: string;
    filterCategoryId: number;
    presets: Preset[];
    manager: Manager;
    openEditPresets: ()=>void;
    openEditCats: ()=>void;
    
    
}
const sortFields = [
	{ name: "id", sortField: "id" },
	{ name: "position", sortField: "position" },
	{ name: "views", sortField: "views" },
	{ name: "name", sortField: "name" },
	{ name: "hit", sortField: "hit" },
	{ name: "created", sortField: "created" },
	{ name: "price", sortField: "price" },
	{ name: "stock", sortField: "stock" }
];
export default class Products extends React.Component<Props, State> {
	// constructor(props){
	//     super(props);
	// }
	state = {
		products: [],
		presets: [],
		sites: [],
		focusedPlaylistId: null
	};
	fetchData(page: number, sortField: string = "created") {
		fetch(
			`https://yesbeat.ru/admin-api/index.php?products=true&page=${page}&sortField=${sortField}&keyword=${this.props.searchText}&excludeText=${this.props.excludeText}&filterCategoryId=${this.props.filterCategoryId}`
		,{
			method: "post",
			body: JSON.stringify({ manager: this.props.manager })
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
				console.log("res fetchData", res);
				if (res.error) {
					alert("error" + res.error);
				}
				this.setState(
					{
						products: res.products,
						presets: res.presets,
						sites: res.sites
					},
					() => {
						const productsIds = this.state.products.map(
							(item: any) => item.id
						);
						// console.log('productsIds' , productsIds)
						this.props.setProductOnPageIds(productsIds);
						console.log("forceUpdate");
						this.forceUpdate();
					}
				);
				this.props.setPagination(res.pagination);
			});
	}
	shouldComponentUpdate(nextProps: any, nextState: State) {
		if (
			nextProps.currentPage !== this.props.currentPage ||
			nextProps.currentSortIndex !== this.props.currentSortIndex ||
			nextProps.searchText !== this.props.searchText ||
            nextProps.excludeText !== this.props.excludeText||
            nextProps.filterCategoryId !== this.props.filterCategoryId||
            nextState.focusedPlaylistId !== this.state.focusedPlaylistId
            
            
		) {
			return true;
		}
		return false;
	}
	componentDidMount() {
		const page = this.props.currentPage;
		this.props.setSortListItems(sortFields);
		this.fetchData(page, sortFields[this.props.currentSortIndex].sortField);
	}
	componentDidUpdate(prevProps: Props) {
		if (
			prevProps.currentPage !== this.props.currentPage ||
			prevProps.currentSortIndex !== this.props.currentSortIndex ||
			prevProps.searchText !== this.props.searchText||
			prevProps.excludeText !== this.props.excludeText||
            prevProps.filterCategoryId !== this.props.filterCategoryId
		) {
			this.fetchData(
				this.props.currentPage,
				sortFields[this.props.currentSortIndex].sortField
			);
		}
	}
	// shouldComponentUpdate(){
	//     return false;
	// }

	setFocusedPlaylistId(id: number) {
        console.log('setFocusedPlaylistId' , id);
		if (id) {
			this.setState({ focusedPlaylistId: id });
		}
    }
    
	renderProductsList() {
        // this.state.products = this.state.products.slice(0,2);//asd
		return (
			<div className="products">
                
				{this.state.products
					? this.state.products.map((item: any) => {
							return (
								<Product
                                    openEditPresets={this.props.openEditPresets}
                                    openEditCats={this.props.openEditCats}
                                    disableForCronCatByName={item.disableForCronCatByName}
									key={item.id}
									id={item.id}
									name={item.name}
									title={item.title}
									type={item.type}
									categories_ids={item.categories_ids}
									songs={item.music}
									categories={this.props.categories}
									presets={this.props.presets}
									sites={this.state.sites}
									disabledOnSites={item.disabledOnSites}
									isFocusedPlaylist={
										item.id === this.state.focusedPlaylistId
									}
									setFocusedPlaylistId={this.setFocusedPlaylistId.bind(
										this
									)}
								></Product>
								// <span>{item.id}</span>
								// <div>{item.id}</div>
							);
					  })
					: null}
			</div>
		);
	}
	render() {
		return <>
        {this.renderProductsList()}
        </>;
	}
}
