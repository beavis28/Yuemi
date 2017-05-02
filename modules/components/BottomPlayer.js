import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { getTime, setTime } from '../lib/audio';
import RNFetchBlob from 'react-native-fetch-blob';
import { musicInterface } from '../lib/audio';

class BottomPlayer extends Component {

	constructor({current, seconds, updatePaused, setPaying, updateTime}){
		super();
	}

	parseSeconds(seconds) {
		seconds = Number(seconds);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		return `00${m}`.slice(-2) + ':' + `00${s}`.slice(-2);
	}

	getButton(){
		if(this.props.current.paused){
			return (
				<Image
					source={require('../../play.png')}
					style={styles.playPauseImage}
				/>
			);
		} else {
			return (
				<Image
					source={require('../../pause.png')}
					style={styles.playPauseImage}
				/>
			);
		}
	}

	getToRender(){
		// Shouldn't parse seconds of duration repeatedly. Just do it once.
		// Duration counter lags on emulator.
		// Reset slider to 0 on new song.
		if(this.props.current.title != ''){
			return (
				<View style={styles.bottomPlayerContainer}>
					<Image
						source={{uri: 'file:///' + RNFetchBlob.fs.dirs.PictureDir + '/' + this.props.current.id + '.jpg'}}
						style={{
							width: 50,
							height: 50,
							marginLeft: 15,
						}}
					/>
					<View style={styles.playingTextContainer}>
						<Text style={styles.playingText} numberOfLines={1}>
							{this.props.current.title}
						</Text>
						<Text style={styles.playingText}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.current.duration)}
						</Text>
					</View>
					<TouchableOpacity onPress={() => musicInterface(this.props.current, this.props.updatePaused, this.props.setPlaying, this.props.updateTime)}>
						{this.getButton()}
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<Text style={styles.playingText}>
					Pick a song.
				</Text>
			);
		}
	}

	render(){
		return(
			<View style={styles.bottomPlayer}>
				{this.getToRender()}
			</View>
		);
	}
}

export default BottomPlayer;