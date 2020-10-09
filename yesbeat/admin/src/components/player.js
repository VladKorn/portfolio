import React, { Component } from "react";

export default class Player extends Component {
    state = {
        songs: this.props.songs,
        currentIndex:0
    }
    // this.renderPlayList = this.renderPlayList.bind(this);
    renderPlayList(){

    }
	render() {
        // console.log(this.state.songs);
		return (
            this.renderPlayList()
			<audio controls={true}>
				<source src={this.state.songs[this.state.currentIndex].songUrl} type="audio/mpeg" />
			</audio>
		);
	}
}
