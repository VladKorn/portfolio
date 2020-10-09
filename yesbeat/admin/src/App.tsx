import React, { useState, useEffect } from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Products from "./components/products";
import Users from "./components/users";
import "./App.css";

import GroupIcon from "@material-ui/icons/Group";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Button from "@material-ui/core/Button";

import Pagination from "./components/pagination";
import SortList from "./components/sortList";
import Search from "./components/Search";
import Exclude from "./components/Exclude";

import EditPanel from "./components/EditPanel";
import FilterCategory from "./components/FilterCategory";
import Login from "./components/Login";
import PermissionsDenied from "./components/PermissionsDenied";
import Popup from "./components/Popup";
import EditPresets from "./components/EditPresets";
import EditCats from "./components/EditCats";

const theme = createMuiTheme({
	palette: {
		primary: lightBlue,
		contrastThreshold: 3,
		tonalOffset: 0.2
	},
	typography: {
		fontSize: 12
	}
});

const App: React.FC = () => {
	const [isInit, setIsInit] = useState(true);
	const [totalPages, settotalPages] = useState(0);
	const [currentPage, settCurrentPage] = useState(1);
	const [categories, setCategories] = useState<Category[]>([]);
	const [presets, setPresets] = useState<Preset[]>([]);
	const [productOnPageIds, setProductOnPageIds] = useState([]);
	const [prods, setProds] = useState(true);

	const managerLS = JSON.parse(localStorage.getItem("manager") || `{}`);
	const [manager, setManager] = useState<Manager>(managerLS);

	// const [sites, setSites] = useState();
	const setPagination = (params: Pagination) => {
		if (params) {
			settotalPages(params.totalPages);
		}
	};
	//

	const reloadProducts = () => {
		// console.log('reloadProducts');
		setProds(false);
		setTimeout(() => {
			setProds(true);
		}, 100);
	};

	const [sortListItems, setSortListItems] = useState<Array<
		SortListItem
	> | null>(null);
	const [currentSortIndex, setCurrentSortIndex] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [excludeText, setExcludeText] = useState("");
	const [filterCategoryId, setFilterCategoryId] = useState(-1);

	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [popupContent, setPopupContent] = useState();

	const popup = (clild: any) => {
		setPopupContent(clild);
		setPopupIsOpen(true);
    };
    const openEditPresets = ()=>{
        popup(
            <EditPresets
                presets={presets}
                categories={categories}
            />
        );
    }
    const openEditCats = ()=>{
        popup(
            <EditCats
             
                categories={categories}
            />
        );
    }
	useEffect(() => {
		if (manager.login && manager.password) {
			fetch(`https://yesbeat.ru/admin-api/index.php?initial=true`, {
				method: "post",
				body: JSON.stringify({ manager: manager })
			})
				.then(res => res.json())
				.then(res => {
					console.log("app init res", res);
					if (res.error) {
						alert("error " + res.error);
					} else {
						setCategories(res.categories);
						setPresets(res.presets);
						setIsInit(false);
					}
				});
			//
            localStorage.setItem("manager", JSON.stringify(manager));
           
		}
	}, [manager]);

	if (!manager.login || !manager.password) {
		return (
			<MuiThemeProvider theme={theme}>
				<Login setManager={setManager} manager={manager} />
			</MuiThemeProvider>
		);
	}
	if (isInit) {
		return null;
    }
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<header className="App-header">
						
						<div className="search-wrap">
							<div id="manager">
								<Button
									variant="outlined"
									color="primary"
									onClick={() => {
										setManager({});
									}}
								>
									Log out
								</Button>
								<span>{manager.login} </span>
							</div>
							<Search
								setSearchText={setSearchText}
								searchText={searchText}
							/>
							<Exclude
								setExcludeText={setExcludeText}
								excludeText={excludeText}
							/>
							<FilterCategory
								categories={categories}
								setFilterCategoryId={setFilterCategoryId}
								filterCategoryId={filterCategoryId}
							/>
						</div>
						<div id="header-navs">
							<nav>
								<NavLink
									activeClassName="is-active"
									to="/admin/users"
									exact
								>
									<GroupIcon style={{ fontSize: 40 }} />
								</NavLink>
								<NavLink
									activeClassName="is-active"
									to="/admin/"
									exact
								>
									<QueueMusicIcon style={{ fontSize: 40 }} />
								</NavLink>
							</nav>
							<SortList
								items={sortListItems}
								currentSortIndex={currentSortIndex}
								setCurrentSortIndex={setCurrentSortIndex}
							/>
							<Pagination
								settCurrentPage={settCurrentPage}
								totalPages={totalPages}
								currentPage={currentPage}
							/>
						</div>
					</header>
					<main>
						<Switch>
							<Route exact path="/admin/users">
								{(manager &&
									manager.permissions &&
									manager.permissions.includes("users")) ||
								(manager &&
									manager.permissions &&
									manager.permissions.includes("all")) ? (
									<Users
										manager={manager}
										currentPage={currentPage}
										setPagination={setPagination}
										currentSortIndex={currentSortIndex}
										setSortListItems={setSortListItems}
									/>
								) : (
									<PermissionsDenied />
								)}
							</Route>
							<Route path="/admin/">
								{(manager &&
									manager.permissions &&
									manager.permissions.includes("products")) ||
								(manager &&
									manager.permissions &&
									manager.permissions.includes("all")) ? (
									<>
										<EditPanel
											categories={categories}
											productOnPageIds={productOnPageIds}
											presets={presets}
											reloadProducts={reloadProducts}
										/>
										{prods ? (
											<Products
                                                openEditPresets={openEditPresets}
                                                openEditCats={openEditCats}
												manager={manager}
												categories={categories}
												currentPage={currentPage}
												setPagination={setPagination}
												currentSortIndex={
													currentSortIndex
												}
												setSortListItems={
													setSortListItems
												}
												searchText={searchText}
												excludeText={excludeText}
												setProductOnPageIds={
													setProductOnPageIds
												}
												filterCategoryId={
													filterCategoryId
												}
												presets={presets}
											/>
										) : null}
									</>
								) : (
									<PermissionsDenied />
								)}
							</Route>
						</Switch>
					</main>
					<aside></aside>
					<Popup
						isOpen={popupIsOpen}
						setPopupIsOpen={setPopupIsOpen}
						content={popupContent}
					></Popup>
				</div>
			</MuiThemeProvider>
		</Router>
	);
};

export default App;
