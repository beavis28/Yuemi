import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	View, Text, TouchableNativeFeedback,
	TouchableHighlight, Platform, Image,
	Alert
} from 'react-native';
import _ from 'lodash';

import {
	setPlaying, updateTime, updatePaused,
	unsetPlaying, setPlaylist, setAudio,
	deleteSong, setActiveMenu
} from 'Yuemi/src/action';
import Audio from 'Yuemi/src/lib/audio';
import styles from './styles';

class Row extends PureComponent {

	constructor() {
		super();
	}

	_musicInterface() {
		const {
			current, updatePaused, setPlaying,
			unsetPlaying, updateTime, id, downloaded,
			playlist
		} = this.props;
		let index = this._getPlaylistIndex(playlist, id);
		let getData = this._getData.bind(this);
		let bundle = {
			current, playlist,
			unsetPlaying, setPlaying,
			updateTime, updatePaused,
			index, getData,
		};
		if (this.props.audioObj != null) {
			this.props.audioObj.endMusic();
		}
		let audio = new Audio(bundle);
		this.props.setAudio(audio);
	}

	_getData() {
		const repeat = this.props.repeat;
		const shuffle = this.props.shuffle;
		return { repeat, shuffle };
	}

	_edit() {
		this.props.setActiveMenu('');
		this.props.editSong(this.props.id);
	}

	_getPlaylistIndex(list, id) {
		const index = _.indexOf(list, id);
		if (index > -1) {
			return index;
		}
		return 0;
	}

	_playlistAdd() {
		this.props.setActiveMenu('');
		this.props.navigation.navigate('EditPlaylists', { song: this.props.id });
	}

	_unlinkFile() {
		if (this.props.audioObj != null) {
			this.props.audioObj.endMusic();
		}
		const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.id;
		RNFetchBlob.fs.unlink(path + '.mp3')
			.then(() => {
				console.log('DELETED:', path + '.mp3');
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
		RNFetchBlob.fs.unlink(path + '.jpg')
			.then(() => {
				console.log('DELETED:', path + '.jpg');
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	}

	_deleteSong() {
		Alert.alert(
			'Are you sure you want to delete this song?',
			this.props.title,
			[
				{
					text: 'YES', onPress: () => {
						this._unlinkFile(this.props.id);
						this.props.deleteSong(this.props.id);
						this.props.setActiveMenu('');
					}
				},
				{ text: 'CANCEL' },
			]
		);
	}

	renderImage() {
		return (
			<Image
				source={{ uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.id + '.jpg' }}
				style={styles.songImage}
			/>
		);
	}

	renderMenu() {
		return (
			<View style={styles.menu}>
				<View style={styles.menuOption}>
					<Icon
						name='delete'
						size={40}
						color='#fff'
						onPress={this._deleteSong.bind(this)}
					/>
				</View>
				<View style={styles.menuOption}>
					<Icon
						name='playlist-add'
						size={40}
						color='#fff'
						onPress={this._playlistAdd.bind(this)}
					/>
				</View>
				<View style={styles.menuOption}>
					<Icon
						name='edit'
						size={40}
						color='#fff'
						onPress={this._edit.bind(this)}
					/>
				</View>
				<View style={styles.menuOption}>
					<Icon
						name='cancel'
						size={40}
						color='#fff'
						onPress={this._handlePressCancel.bind(this)}
					/>
				</View>
			</View>
		);
	}

	_handlePressCancel() {
		this.props.setActiveMenu('');
	}

	_handlePressMore() {
		this.props.setActiveMenu(this.props.id);
	}

	renderContent() {
		const download = this.props.downloaded[this.props.id];
		return (
			<View style={styles.listRow}>
				<View style={styles.imageContainer}>
					{this.renderImage()}
				</View>
				<View style={styles.textContainer}>
					<Text style={this.props.currentId == this.props.id ? styles.listTextPlaying : styles.listText} numberOfLines={1}>
						{this.props.title}
					</Text>
					<Text style={this.props.currentId == this.props.id ? styles.listTextPlaying : styles.listText} numberOfLines={1}>
						{download.artist + ' - ' + download.duration}
					</Text>
				</View>
				<View style={styles.moreContainer}>
					<Icon
						name='more-vert'
						size={30}
						color='#000'
						onPress={this._handlePressMore.bind(this)}
					/>
				</View>
			</View>
		);
	}

	renderSong() {
		if (Platform.OS == 'ios') {
			return (
				<TouchableHighlight onPress={this._musicInterface.bind(this)} underlayColor='#ddd'>
					{this.renderContent()}
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableNativeFeedback onPress={this._musicInterface.bind(this)}>
					{this.renderContent()}
				</TouchableNativeFeedback>
			);
		}
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.id == this.props.activeMenuId || this.props.id == nextProps.activeMenuId) {
			return true;
		} else if (this.props.id == this.props.currentId || this.props.id == nextProps.currentId) {
			return true;
		} else if (this.props.title != nextProps.title || this.props.artist != nextProps.artist) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('MUSIC_ROW_RENDERING');
		if (this.props.activeMenuId == this.props.id) {
			return this.renderMenu();
		} else {
			return this.renderSong();
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		audioObj: state.audio.audio,
		currentId: state.audio.id,
		shuffle: state.audio.shuffle,
		repeat: state.audio.repeat,
		activeMenuId: state.me.activeMenuId,
		downloaded: state.downloaded.downloaded,
		title: state.downloaded.downloaded[ownProps.id].title,
		artist: state.downloaded.downloaded[ownProps.id].artist,
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
		setAudio: (obj) => {
			dispatch(setAudio(obj));
		},
		deleteSong: (id) => {
			dispatch(deleteSong(id));
		},
		setActiveMenu: (id) => {
			dispatch(setActiveMenu(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
