import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import edit from "./edit";

interface Props{
    key: number;
    id: number;
    name: string;
    email: string;
    ordersCount: number;
    ordersTotalPrice: number;
    lastOrderDate: number;
    groupId: number;
    allGroups: Array<UserGroup>;
}
interface UserGroup{
    id:number;
    name:string;
}
interface State{
    // allGroups: Array<string>;
    userGroupId: number;
}
export default class user extends Component<Props, State> {
	state = {
        // allGroups: ["Постоян", "15", "30%"],
        userGroupId: this.props.groupId
	};
	componentDidMount() {
		// this.setState({ allGroups: this.props.allGroups.map((item:any)=>{return item.name})} , ()=>{
		// console.log('allGroups' , this.state.allGroups)
		// });
    }
    handleGroupChange(value: number){
        // const value = parseInt( event.target.value);
    }
    componentDidUpdate(prevProps:any , prevState:State){

        if(prevState.userGroupId !== this.state.userGroupId){
            edit({
                type: 'user',
                action: 'edit',
                id: this.props.id,
                data: {
                    userGroupId: this.state.userGroupId
                },
            });
        }
    }
	render() {
		return (
			<div className="user item">
				<div className="user--field user--id" title='user id'>{this.props.id}</div>
				<div className="user--field user--name">
					<Link
                        target='_blank'
						href={`https://yesbeat.ru/simpla/index.php?module=UserAdmin&id=${this.props.id}`}
					>
						{this.props.name}
					</Link>
				</div>
				<div className="user--field user--email" title='email'>
					{this.props.email}
				</div>
				<div className="user--field user--ordersCount" title='ordersCount'>
					{this.props.ordersCount}
				</div>
				<div className="user--field user--lastOrderDate" title='lastOrderDate'>
					{this.props.lastOrderDate}
				</div>
				<div className="user--field user--ordersTotalPrice" title='ordersTotalPrice'>
					{this.props.ordersTotalPrice} руб.
				</div>

				<Select

					value={this.state.userGroupId}
                    // onChange={this.handleGroupChange}
                    onChange={(event)=>{
                        if (typeof event.target.value === 'number') {
                            this.setState({ userGroupId: event.target.value});
                        }
                    }}
                    
					className="user--select"
				>
					<MenuItem value={0} key={0}>
						Не входит в группу
					</MenuItem>
					{this.props.allGroups.map((item: UserGroup) => {
						return (
							<MenuItem value={item.id} key={item.id}>
								{item.name}
							</MenuItem>
						);
					})}
				</Select>
			</div>
		);
	}
}
