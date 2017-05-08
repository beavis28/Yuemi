import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
	View, Text, TouchableNativeFeedback,
	TouchableHighlight, Platform, Image,
	AsyncStorage
} from 'react-native';
import _ from 'lodash';

import {
	setPlaying, updateTime, updatePaused,
	unsetPlaying, setPlaylist, setAudio
} from 'Yuemi/src/action';
import Audio from 'Yuemi/src/lib/audio';
import styles from './styles';

class Row extends Component {

	constructor(){
		super();
	}

	_musicInterface(){
		const {
			current, updatePaused, setPlaying,
			unsetPlaying, updateTime, id, downloaded
		} = this.props;
		let playlist = this._getDefaultPlaylist(downloaded, id);
		let bundle = {
			current, playlist,
			unsetPlaying, setPlaying,
			updateTime, updatePaused
		};
		if(this.props.current.audio != null){
			this.props.current.audio.endMusic();
		}
		let audio = new Audio(bundle);
		this.props.setAudio(audio);
	}

	_getDefaultPlaylist(downloaded, id){
		const keys = _.keys(downloaded);
		const index = _.indexOf(keys, id);
		let playlist;
		if(index > -1){
			playlist = _.slice(keys, index);
			this.props.setPlaylist(playlist);
		}
		return playlist;
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
				<TouchableHighlight onPress={this._musicInterface.bind(this)} underlayColor='#ddd'>
					{this.getToRender()}
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableNativeFeedback onPress={this._musicInterface.bind(this)}>
					{this.getToRender()}
				</TouchableNativeFeedback>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		paused: state.audio.paused,
		current: state.audio,
		id: ownProps.id,
		downloaded: state.downloaded.downloaded,
		title: state.downloaded.downloaded[ownProps.id].title,
		playlist: state.playlist.playlist,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPlaying: (obj) => {
			dispatch(setPlaying(obj));
		},
		unsetPlaying: () => {
			dispatch(unsetPlaying());
		},
		updateTime: (seconds) => {
			dispatch(updateTime(seconds));
		},
		updatePaused: (value) => {
			dispatch(updatePaused(value));
		},
		setPlaylist: (list) => {
			dispatch(setPlaylist(list));
		},
		setAudio: (obj) => {
			dispatch(setAudio(obj));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
