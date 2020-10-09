import React, { Component } from "react";
import Countdown from "react-countdown";
// import { DateTime }  from'luxon';
import { DateTime } from "luxon";

import "./index.css";
// let lineEnd: DateTime.fromObject({hour: this.props.dinnerEnd.h , minute: this.props.dinnerEnd.m});

export default class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			now: DateTime.local().ts,
			lineStart: DateTime.fromObject({
				hour: this.props.breakfastStart.h,
				minute: this.props.breakfastStart.m,
			}).ts,
			lineEnd: DateTime.fromObject({
				hour: this.props.dinnerEnd.h,
				minute: this.props.dinnerEnd.m,
			}).ts,
			difference: 0,
			// progress: ( (this.state.lineEnd - this.state.now)/(this.state.lineEnd - this.state.lineStart) ) *100
			progress: 0,
			text: " завтрака",
		};
		this.setProgress = this.setProgress.bind(this);
	}
	setProgress() {
		if (this.props.timeIndex === 2) this.setState({ text: " обеда" });
		if (this.props.timeIndex === 3) this.setState({ text: " ужина" });
		// 
		let allLine = this.state.lineEnd - this.state.lineStart;

		let rest = this.state.lineEnd - DateTime.local().ts;
		this.setState({ difference: rest });

		let percent = (rest / allLine) * 100;

		this.setState({ progress: 100 - percent });
		console.log('progress' , this.state.progress , 100 - percent)
		
	}
	componentDidMount() {
		// ( (this.state.lineEnd - this.state.now)/(this.state.lineEnd - this.state.lineStart) ) *100
		this.setProgress();
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps != this.props) {
			this.setProgress();
		}
	}
	render() {
		return (
			<section className="TimeLine container">
				{/* {this.props.breakfastStart.h} */}
				<div className="info-wrap">
					До окончания 
					{this.state.text} <br />
					осталось
					<Countdown
						date={this.props.timerEndJsDate}
						renderer={({ hours, minutes, seconds, completed }) => {
							if (completed) {
								return "";
							} else {
								return (
									<b>
										{" "}
										{hours} ч {minutes} м
									</b>
								);
							}
						}}
					/>
				</div>
				<div className="line-wrap">
					<div className="line-labels">
						<span>ЗАВТРАК</span>
						<span>ОБЕД</span>
						<span>УЖИН</span>
					</div>
					<div className="line">
						<span></span>
						<span></span>
						<span></span>
						<div
							className="progress"
							style={{ width: this.state.progress + "%" }}
						>
							<div></div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

// WEBPACK FOOTER //
// ./src/components/TimeLine/TimeLine.jsx
