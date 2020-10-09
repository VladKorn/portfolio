/// <reference types="react-scripts" />

interface Pagination{
    totalPages: number;
    currentPage: number;
    settCurrentPage?: any;
}
// type Nullable<T> = T | null;
// interface ProductCategories{
//     category: Category[];
// }
interface Category{
    name: string;
    id: number;
    cronKeywords: string;
}

// const empty = <never[] & {length: 0}>[];
interface SortListProps{
    items: Array<SortListItem>|null;
    currentSortIndex?: number;
    setCurrentSortIndex:any;
}
interface SortList{
    items: Array<SortListItem>|null;
    currentSortIndex?: number;
}
interface SortListItem{
    name: string;
    sortField: string;
}


interface editProduct {
	name?: string;
	title?: string;
	type?: string;
    productCategories?: Array<number>;
    disable_on_sites?: Array<number>;
    disableForCronCatByName?: boolean;
    
}
interface UserEditData{
    userGroupId?: number
}
interface productsEditData{
    productsIds: Array<number>;
    categoryIds: Array<number>;
}
interface Edit{
	type: 'user'|'products'|'preset'|'cat';
	action: 'delete'|'add'|'edit';
	id?: number|Array<number>;
    data?: UserEditData | productsEditData | pressetEditData;
	productCategories?: Array<number>;
}
// interface Presets{
    // presets: Array<Preset>;
// }
interface Preset{
    id: number;
    name: string;
    sets: Array<number>
}
interface presetEditData{
    name: string;
    id?: number;
    sets: Array<number> 
}
interface Manager{
    login?: string;
    password?: string;
    permissions?: Array<string>
}
