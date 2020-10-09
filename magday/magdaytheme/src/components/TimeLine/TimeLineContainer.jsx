import React, { Component } from 'react'
import TimeLine from './TimeLine';

export default class TimeLineContainer extends Component {
	constructor(props){
		super(props);
			this.state={
				breakfastStart:{h: 7 , m: 30},
				lunchStart: {h: 11 , m: 35},
				dinnerStart:{h: 15 , m: 30},
				dinnerEnd: {h: 22 , m: 50}
			}
	}
	componentDidMount(){
	}
	componentDidUpdate(prevProps){
		if(prevProps.generalData !== this.props.generalData){
			let data = this.props.generalData;
			this.setState({
				breakfastStart : {h: data.breakfast.split(':')[0] , m: data.breakfast.split(':')[1]},
				lunchStart : {h: data.lunch.split(':')[0] , m: data.lunch.split(':')[1]},
				dinnerStart : {h: data.dinner.split(':')[0] , m: data.dinner.split(':')[1]},
				dinnerEnd : {h: data.dinnerEnd.split(':')[0] , m: data.dinnerEnd.split(':')[1]},
			});
			
			
		}
	}
	render() {
		return (
			<TimeLine 
				timerEndJsDate={this.props.timerEndJsDate}
				breakfastStart={this.state.breakfastStart}
				lunchStart={this.state.lunchStart}
				dinnerStart={this.state.dinnerStart}
				dinnerEnd={this.state.dinnerEnd}

				timeIndex={this.props.timeIndex}

			/>
		)
	}
}



// WEBPACK FOOTER //
// ./src/components/TimeLine/TimeLineContainer.jsx