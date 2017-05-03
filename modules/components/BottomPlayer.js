import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { getTime, setTime } from '../lib/audio';
import RNFetchBlob from 'react-native-fetch-blob';
import { musicInterface } from '../lib/audio';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
				<Icon
					style={styles.playPauseIcon}
					name='play-arrow' size={30}
					color='#000'
					onPress={() => musicInterface(this.props.current, this.props.updatePaused, this.props.setPlaying, this.props.updateTime)}
				/>
			);
		} else {
			return (
				<Icon
					style={styles.playPauseIcon}
					name='pause' size={30}
					color='#000'
					onPress={() => musicInterface(this.props.current, this.props.updatePaused, this.props.setPlaying, this.props.updateTime)}
				/>
			);
		}
	}

	getToRender(){
		// Shouldn't parse seconds of duration repeatedly. Just do it once.
		// Duration counter lags on emulator.
		// Reset slider to 0 on new song.
		// Style naming makes no sense.
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
			<View style={styles.bottomPlayer}>
				{this.getToRender()}
			</View>
		);
	}
}

export default BottomPlayer;