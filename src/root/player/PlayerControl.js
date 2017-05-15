import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';

import styles from './styles';
import { musicInterface } from 'Yuemi/src/lib/audio';
import {
	setPlaying, unsetPlaying, updateTime, updatePaused
} from 'Yuemi/src/action';

class PlayerControl extends Component {

	constructor(){
		super();
	}

	parseSeconds(seconds) {
		seconds = Number(seconds);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		return `00${m}`.slice(-2) + ':' + `00${s}`.slice(-2);
	}

	_musicInterface(){
		if(this.props.current.paused){
			this.props.current.audio.playMusic();
		} else {
			this.props.current.audio.pauseMusic();
		}
	}

	_skipNext(){
		this.props.current.audio.skipNext();
	}

	_skipPrev(){
		this.props.current.audio.skipPrev();
	}

	_setTime(value){
		this.props.current.audio.setTime(value);
	}

	getPlayPause(){
		if(this.props.current.paused){
			return (
				<Icon
					style={styles.playPauseIcon}
					name='play-arrow' size={30}
					color='#000'
					onPress={this._musicInterface.bind(this)}
				/>
			);
		} else {
			return (
				<Icon
					style={styles.playPauseIcon}
					name='pause' size={30}
					color='#000'
					onPress={this._musicInterface.bind(this)}
				/>
			);
		}
	}

	getContent(){
		return (
			<View style={styles.controlContent}>
				<View style={styles.iconContainer}>
					<Icon
						style={styles.playPauseIcon}
						name='skip-previous' size={30}
						color='#000'
						onPress={this._skipPrev.bind(this)}
					/>
					{this.getPlayPause()}
					<Icon
						style={styles.playPauseIcon}
						name='skip-next' size={30}
						color='#000'
						onPress={this._skipNext.bind(this)}
					/>
				</View>
				<View style={styles.sliderContainer}>
					<Slider
						style={{height: '100%', width: '100%'}}
						trackStyle={styles.track}
						thumbStyle={styles.thumb}
						minimumTrackTintColor='#e60000'
						maximumValue={this.props.current.duration}
						value={this.props.seconds}
						onValueChange={(value) => this._setTime(value)}
					/>
				</View>
			</View>
		);
	}

	getToRender(){
		if(this.props.current.id != ''){
			return (
				<View>
					{this.getContent()}
				</View>
			);
		} else {
			return (
				<View/>
			);
		}
	}

	render(){
		return (
			<View style={styles.player}>
				{this.getToRender()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		current: state.audio,
		seconds: state.audio.seconds,
		downloaded: state.downloaded.downloaded,
		playlist: state.playlist.playlist
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControl);
