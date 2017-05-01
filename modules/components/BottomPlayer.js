import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slider from 'react-native-slider';
import styles from '../styles/styles';
import { getTime, setTime } from '../lib/audio';

class BottomPlayer extends Component {

	constructor({current, seconds}){
		super();
	}

	parseSeconds(seconds) {
		seconds = Number(seconds);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		return `00${m}`.slice(-2) + ':' + `00${s}`.slice(-2);
	}

	getToRender(){
		// Shouldn't parse seconds of duration repeatedly. Just do it once.
		// Duration counter lags on emulator.
		// Reset slider to 0 on new song.
		let title = this.props.current.title;
		if(title.length > 20){
			title = title.substr(0, 20) + '...';
		}
		if(this.props.current.title != ''){
			return (
				<View style={{width: '80%', height: '100%'}}>
					<View style={styles.playingTextContainer}>
						<Text style={{fontSize: 20, textAlign: 'center'}}>
							{title}
						</Text>
						<Text style={{fontSize: 20, textAlign: 'center', marginTop: 25}}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.current.duration)}
						</Text>
					</View>
					<View style={styles.sliderContainer}>
						<Slider
							trackStyle={styles.track}
							thumbStyle={styles.thumb}
							minimumTrackTintColor='#e60000'
							maximumValue={this.props.current.duration}
							value={this.props.seconds}
							onValueChange={(value) => setTime(this.props.current.soundObj, value)}
						/>
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
			<View style={styles.bottomPlayer}>
				{this.getToRender()}
			</View>
		);
	}
}

export default BottomPlayer;
