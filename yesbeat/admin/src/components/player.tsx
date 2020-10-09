import React, { Component } from "react";
interface State{
    songs: Array<any>,
    currentIndex:number,
    file: string,
    autoplay: boolean
}
interface Props{
    isFocusedPlaylist: number;
    songs: any;
    setFocusedPlaylistId:any;
    id: number;
}

export default class Player extends Component<Props , State> {
    state = {
        songs: this.props.songs,
        currentIndex:0,
        file: this.props.songs[0].songUrl,
        autoplay: true
    }
    // this.setFocusedPlaylistId = this.setFocusedPlaylistId.bind(this);
    componentDidUpdate(prevProps:any){
        // if(prevProps.isFocused !== this.props.isFocused){
        //     this.setState({
        //         autoplay: false
        //     });
        // }
    }
    playSong(file:any , index:number){
        console.log('playSong' , file);
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
                    className={index === this.state.currentIndex && this.props.isFocusedPlaylist? 'player-song active' : "player-song"}>
                    {item.songName}</div>
                );
            })
        );
    }
    setFocusedPlaylistId(){
        this.props.setFocusedPlaylistId(this.props.id);
    }
	render() {
        // console.log(this.state.songs);
		return (
            <div>
                <div onClick={this.setFocusedPlaylistId.bind(this)}>

            {this.renderPlayList()}
                </div>
			{this.props.isFocusedPlaylist ? <audio controls={true} src={this.state.file} autoPlay={this.state.autoplay}/> :null }
            </div>
		);
	}
}
