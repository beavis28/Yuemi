import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, Slider } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { musicInterface } from 'Yuemi/src/lib/audio';
import {
	setPlaying, unsetPlaying, updateTime, updatePaused
} from 'Yuemi/src/action';
import Audio from 'Yuemi/src/lib/audio';

class PlayerFull extends Component {

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
					name='play-circle-filled'
					size={50}
					color='#ff6666'
					onPress={this._musicInterface.bind(this)}
				/>
			);
		} else {
			return (
				<Icon
					name='pause-circle-filled'
					size={50}
					color='#ff6666'
					onPress={this._musicInterface.bind(this)}
				/>
			);
		}
	}


	render(){
		if(this.props.current.id != ''){ // not good
			return (
				<Modal
					visible={this.props.visible}
					onRequestClose={() => this.props.setModal(false)}
					animationType='slide'
				>
					<View style={styles.playerFull}>
						<View style={styles.chevronContainer}>
							<Icon
								name='keyboard-arrow-down'
								size={40}
								color='#ff6666'
								onPress={() => this.props.setModal(false)}
							/>
						</View>
						<View style={styles.imageContainer} elevation={5}>
							<Image
								source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.current.id + '.jpg'}}
								resizeMode='cover'
								style={styles.playerFullImage}
							/>
						</View>
						<View style={styles.textContainer}>
							<Text style={{textAlign: 'center', width: '90%'}} numberOfLines={2}>
								{this.props.downloaded[this.props.current.id].title}
							</Text>
						</View>
						<View style={styles.sliderContainer}>
							<Slider
								style={styles.slider}
								minimumTrackTintColor='#e60000'
								maximumTrackTintColor='#ff6666'
								thumbTintColor='#e60000'
								maximumValue={this.props.current.duration}
								value={this.props.seconds}
								onValueChange={(value) => this._setTime(value)}
							/>
						</View>
						<View style={styles.controlsContainer}>
							<View style={styles.secondsContainer}>
								<Text style={styles.seconds}>
									{Audio.parseSeconds(this.props.seconds)}
								</Text>
							</View>
							<View style={styles.iconContainer}>
								<Icon
									name='skip-previous' size={30}
									color='#000'
									onPress={this._skipPrev.bind(this)}
								/>
								{this.getPlayPause()}
								<Icon
									name='skip-next' size={30}
									color='#000'
									onPress={this._skipNext.bind(this)}
								/>
							</View>
							<View style={styles.secondsContainer}>
								<Text style={styles.seconds}>
									{Audio.parseSeconds(this.props.duration)}
								</Text>
							</View>
						</View>
					</View>
				</Modal>
			);
		} else {
			return (
				<View />
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		current: state.audio,
		seconds: state.audio.seconds,
		duration: state.audio.duration,
		downloaded: state.downloaded.downloaded,
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFull);
