import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
	View, Text, TouchableNativeFeedback,
	TouchableHighlight, Platform, Image
} from 'react-native';
import _ from 'lodash';

import {
	setPlaying, updateTime, updatePaused,
	unsetPlaying, setPlaylist
} from 'Yuemi/src/action';
import {
	handleMusic, pauseMusic, resumeMusic, musicInterface
} from 'Yuemi/src/lib/audio';
import styles from './styles';

class Row extends Component {

	constructor(){
		super();
	}

	_musicInterface(){
		const {
			current, updatePaused, setPlaying,
			unsetPlaying, updateTime, id, paused,
			downloaded
		} = this.props;

		const keys = _.keys(downloaded);
		const index = _.indexOf(keys, id);
		let arr;
		if(index > -1){
			arr = _.slice(keys, index);
			this.props.setPlaylist(arr);
		}

		musicInterface(
			current, updatePaused, setPlaying,
			unsetPlaying, updateTime, id, paused,
			arr
		);
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
