import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
	View, Text, TouchableNativeFeedback,
	TouchableHighlight, Platform, Image
} from 'react-native';

import {
	setPlaying, updateTime,
	updatePaused
} from 'Yuemi/src/action';
import {
	handleMusic, pauseMusic,
	resumeMusic
} from 'Yuemi/src/lib/audio';
import styles from './styles';

class Row extends Component {

	constructor(){
		super();
	}

	musicInterface(){
		// put this in audio file and just pass params
		if(this.props.current.id != ''){
			if(this.props.current.id == this.props.id){
				if(this.props.paused){
					resumeMusic(this.props.current.soundObj, this.props.updatePaused, this.props.setPlaying, this.props.updateTime);
				} else {
					pauseMusic(this.props.current.soundObj, this.props.updatePaused);
				}
			} else {
				handleMusic(this.props.current, this.props.id, this.props.title, this.props.setPlaying, this.props.updateTime);
			}
		} else {
			handleMusic(this.props.current, this.props.id, this.props.title, this.props.setPlaying, this.props.updateTime);
		}
	}

	getImage(){
		return(
			<Image
				source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.id + '.jpg'}}
				style={{
					width: 50,
					height: 50,
					marginLeft: 15,
				}}
			/>
		);
	}

	getToRender(){
		return (
			<View style={styles.listRow}>
				{this.getImage()}
				<Text style={this.props.current.title == this.props.title ? styles.listText : styles.listTextPlaying} numberOfLines={2}>
					{this.props.title}
				</Text>
			</View>
		);
	}

	render(){
		if(Platform.OS == 'ios'){
			return (
				<TouchableHighlight onPress={() => this.musicInterface()} underlayColor='#ddd'>
					{this.getToRender()}
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableNativeFeedback onPress={() => this.musicInterface()}>
					{this.getToRender()}
				</TouchableNativeFeedback>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		paused: state.audio.paused,
		playing: state.audio.playing,
		current: state.audio,
		id: ownProps.id,
		title: state.downloaded.downloaded[ownProps.id].title,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPlaying: (obj) => {
			dispatch(setPlaying(obj));
		},
		updateTime: (seconds) => {
			dispatch(updateTime(seconds));
		},
		updatePaused: (value) => {
			dispatch(updatePaused(value));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
