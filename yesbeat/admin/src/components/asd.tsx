import React, { Component } from "react";
interface State{
    songs: Array<any>,
    currentIndex:number,
    file: string,
    autoplay: boolean
}

export default class PlayList extends Component<any , State> {
    state = {
        songs: this.props.songs,
        currentIndex:0,
        file: this.props.songs[0].songUrl,
        autoplay: false
    }
    // this.renderPlayList = this.renderPlayList.bind(this);
    playSong(file:any , index:number){
        this.setState({
            file: file, 
            currentIndex:index,
            autoplay: true
        });
    }
    renderPlayList(){
        return(
            this.props.songs.map((item:any , index:number)=>{
                return(
                    <div 
                    key={index} 
                    onClick={()=>{this.playSong(item.songUrl , index)}}
                    className={index === this.state.currentIndex ? 'player-song active' : "player-song"}>
                    {item.songName}</div>
                );
            })
        );
    }
	render() {
        // console.log(this.state.songs);
		return (
            <div>
            {this.renderPlayList()}
			<audio controls={true} src={this.state.file} autoPlay={this.state.autoplay}/>
            </div>
		);
	}
}
