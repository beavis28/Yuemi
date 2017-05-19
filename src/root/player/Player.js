import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import PlayerFull from './PlayerFull';
import Audio from 'Yuemi/src/lib/audio';
import {
	setPlaying, unsetPlaying, updateTime, updatePaused
} from 'Yuemi/src/action';

class Player extends Component {

	constructor(){
		super();
		this.state = {
			modalVisible: false
		}
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

	_setModal(b){
		this.setState({modalVisible: b});
	}

	getToRender(){
		if(this.props.current.id != ''){
			return (
				<TouchableHighlight
					onPress={() => this._setModal(true)}
					underlayColor='#ddd'
					style={{width: '100%', height: '100%'}}
				>
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
								{Audio.parseSeconds(this.props.seconds) + ' / ' + Audio.parseSeconds(this.props.duration)}
							</Text>
						</View>
						{this.getButton()}
					</View>
				</TouchableHighlight>
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
								{Audio.parseSeconds(this.props.seconds) + ' / ' + Audio.parseSeconds(this.props.duration)}
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
			<View style={{flex: 1}}>
				<PlayerFull setModal={this._setModal.bind(this)} visible={this.state.modalVisible}/>
				<View style={styles.player}>
					{this.getToRender()}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		current: state.audio,
		duration: state.audio.duration,
		seconds: state.audio.seconds,
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
