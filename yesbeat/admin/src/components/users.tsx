import React from "react";
import User from "./user";

interface State {
	users: Array<any>;
	allGroups: Array<any>;
}
interface Props {
    manager: Manager;
}
const sortFields = [
    {name: 'id' , sortField: 'id'},
    {name: 'name' , sortField: 'name'},
    {name: 'email' , sortField: 'email'},
    {name: 'orders' , sortField: 'ordersCount'},
    {name: 'date' , sortField: 'lastOrderDate'},
    {name: 'price' , sortField: 'ordersTotalPrice'},
    {name: 'group' , sortField: 'groupId'},
];

export default class Users extends React.Component<any, any> {
	state = {
		users: [],
		allGroups: []
    };

	fetchData(page: number, sortField:string = 'ordersTotalPrice') {
        
		fetch(`https://yesbeat.ru/admin-api/index.php?users=true&page=${page}&sortField=${sortField}` , {
			method: "post",
			body: JSON.stringify({ manager: this.props.manager })
		})
			.then(res => res.json())
			.then(res => {
				// const products = res.products;
                console.log("res", res);
                if(res.error){
                    alert('error' + res.error)
                }
				if (res) {
					this.setState({
						users: res.users,
						allGroups: res.allGroups
					});
                    this.props.setPagination(res.pagination);
				}
			});
	}
	componentDidMount() {
		// const page = this.props.currentPage;
        this.props.setSortListItems(sortFields);
        this.fetchData(this.props.currentPage , sortFields[this.props.currentSortIndex].sortField);

        
        
	}
	componentDidUpdate(prevProps: any) {
		if (prevProps.currentPage !== this.props.currentPage || prevProps.currentSortIndex !== this.props.currentSortIndex ) {
			this.fetchData(this.props.currentPage , sortFields[this.props.currentSortIndex].sortField);
        }
 

	}
	render() {
		return (
			<div className="users">
				{this.state.users
					? this.state.users.map((item: any) => {
							//
							return (
								<User
									key={item.id}
									id={item.id}
									name={item.name}
									email={item.email}
									ordersCount={item.ordersCount}
									ordersTotalPrice={item.ordersTotalPrice}
									lastOrderDate={item.lastOrderDate}
									groupId={item.groupId}
									allGroups={this.state.allGroups}
								></User>
								// <span>{item.id}</span>
								// <div>{item.id}</div>
							);
					  })
					: null}
			</div>
		);
	}
}
