import React, { Component } from 'react';
import {
	View, Text, Image, TouchableOpacity,
	TouchableHighlight, Platform, TouchableNativeFeedback
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { getTime, setTime, musicInterface } from 'Yuemi/src/lib/audio';
import {
	setPlaying, unsetPlaying, updateTime, updatePaused
} from 'Yuemi/src/action';

class PlayerInfo extends Component {

	constructor(){
		super();
	}

	parseSeconds(seconds) {
		seconds = Number(seconds);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		return `00${m}`.slice(-2) + ':' + `00${s}`.slice(-2);
	}

	getContent(){
		return (
			<View style={styles.playerSubcontainer}>
				<View style={styles.playerContainer}>
					<Image
						source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.audio.id + '.jpg'}}
						style={styles.playerImage}
					/>
					<View style={styles.playingTextContainer}>
						<Text style={styles.playingText} numberOfLines={1}>
							{this.props.downloaded[this.props.audio.id].title}
						</Text>
						<Text style={styles.playingText}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.audio.duration)}
						</Text>
					</View>
				</View>
				<Icon
					style={styles.playPauseIcon}
					name='navigate-next' size={30}
					color='#000'
				/>
			</View>
		);
	}

	getToRender(){
		if(this.props.audio.id != ''){
			if(Platform.OS == 'ios'){
				return (
					<TouchableHighlight
						onPress={() => this.props.navigation.navigate('PlayerControl')}
						underlayColor='#ddd'
					>
						{this.getContent()}
					</TouchableHighlight>
				);
			} else {
				return (
					<TouchableNativeFeedback
						onPress={() => this.props.navigation.navigate('PlayerControl')}
					>
						{this.getContent()}
					</TouchableNativeFeedback>
				);
			}
		} else {
			return (
				<View style={styles.playerContainer}>
					<Icon
						style={styles.playerDefaultImage}
						name='library-music' size={30}
						color='#000'
					/>
					<View style={styles.playingTextContainer}>
						<Text style={styles.playingText} numberOfLines={1}>
							Pick a song.
						</Text>
						<Text style={styles.playingText}>
							{this.parseSeconds(this.props.seconds || 0) + ' / ' + this.parseSeconds(this.props.audio.duration)}
						</Text>
					</View>
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
		audio: state.audio,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
