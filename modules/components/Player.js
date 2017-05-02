import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Slider from 'react-native-slider';
import styles from '../styles/player';
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
				<View style={styles.rootContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{this.props.current.title}
						</Text>
						<Text style={styles.text}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.current.duration)}
						</Text>
					</View>
					<View style={styles.imageContainer}>
						<Image
							source={{uri: 'file:///' + RNFetchBlob.fs.dirs.PictureDir + '/' + this.props.current.id + '.jpg'}}
							style={styles.mainImage}
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
							onValueChange={(value) => setTime(this.props.current.soundObj, value)}
						/>
					</View>
					<View style={styles.playPauseImageContainer}>
						<TouchableOpacity onPress={() => musicInterface(this.props.current, this.props.updatePaused, this.props.setPlaying, this.props.updateTime)}>
							{this.getButton()}
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return (
				<Text style={{textAlign: 'center', fontSize: 20}}>
					Pick a song.
				</Text>
			);
		}
	}

	render(){
		return(
			<View style={styles.player}>
				{this.getToRender()}
			</View>
		);
	}
}

export default BottomPlayer;


					// <View style={styles.sliderContainer}>
					// 	<Slider
					// 		trackStyle={styles.track}
					// 		thumbStyle={styles.thumb}
					// 		minimumTrackTintColor='#e60000'
					// 		maximumValue={this.props.current.duration}
					// 		value={this.props.seconds}
					// 		onValueChange={(value) => setTime(this.props.current.soundObj, value)}
					// 	/>
					// </View>


