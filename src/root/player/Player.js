import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { getTime, setTime, musicInterface } from 'Yuemi/src/lib/audio';
import {
	setPlaying, unsetPlaying, updateTime, updatePaused
} from 'Yuemi/src/action';

class Player extends Component {

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

	getButton(){
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

	getToRender(){
		if(this.props.current.id != ''){
			return (
				<View style={styles.bottomPlayerContainer}>
					<Image
						source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.current.id + '.jpg'}}
						style={{
							width: 50,
							height: 50,
							marginLeft: 15,
						}}
					/>
					<View style={styles.playingTextContainer}>
						<Text style={styles.playingText} numberOfLines={1}>
							{this.props.downloaded[this.props.current.id].title}
						</Text>
						<Text style={styles.playingText}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.current.duration)}
						</Text>
					</View>
					{this.getButton()}
				</View>
			);
		} else {
			return (
				<View style={styles.bottomPlayerContainer}>
					<Icon
						style={{
							width: 50,
							height: 50,
							marginLeft: 15,
							textAlign: 'center',
							textAlignVertical: 'center',
						}}
						name='library-music' size={30}
						color='#000'
					/>
					<View style={styles.playingTextContainer}>
						<Text style={styles.playingText} numberOfLines={1}>
							Pick a song.
						</Text>
						<Text style={styles.playingText}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.current.duration)}
						</Text>
					</View>
					<Icon
						style={styles.playPauseIcon}
						name='play-arrow' size={30}
						color='#000'
						onPress={() => console.log('no song')}
					/>
				</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);