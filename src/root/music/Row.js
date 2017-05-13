import React, { Component } from 'react';
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

class Row extends Component {

	constructor(){
		super();
	}

	_musicInterface(){
		const {
			current, updatePaused, setPlaying,
			unsetPlaying, updateTime, id, downloaded
		} = this.props;
		console.log(this.props);
		let playlist = this.props.playlist;
		let index = this._getPlaylistIndex(playlist, id);
		let bundle = {
			current, playlist,
			unsetPlaying, setPlaying,
			updateTime, updatePaused,
			index
		};
		if(this.props.current.audio != null){
			this.props.current.audio.endMusic();
		}
		let audio = new Audio(bundle);
		this.props.setAudio(audio);
	}

	_getPlaylistIndex(list, id){
		const index = _.indexOf(list, id);
		if(index > -1){
			return index;
		}
		return 0;
	}

	_playlistAdd(){
		this.props.setActiveMenu('');
		this.props.navigation.navigate('EditPlaylists', {song: this.props.id});
	}

	_unlinkFile(){
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

	_deleteSong(){
		Alert.alert(
			'Are you sure you want to delete this song?',
			this.props.title,
			[
				{text: 'YES', onPress: () => {
					this._unlinkFile(this.props.id);
					this.props.deleteSong(this.props.id);
					this.props.setActiveMenu('');
				}},
				{text: 'CANCEL'},
			]
		);
	}

	renderImage(){
		return(
			<Image
				source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + this.props.id + '.jpg'}}
				style={{
					width: 50,
					height: 50,
					marginLeft: 15,
				}}
			/>
		);
	}

	renderMenu(){
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
						name='cancel'
						size={40}
						color='#fff'
						onPress={() => this.props.setActiveMenu('')}
					/>
				</View>
			</View>
		);
	}

	renderContent(){
		return (
			<View style={styles.listRow}>
				{this.renderImage()}
				<Text style={this.props.current.title == this.props.title ? styles.listText : styles.listTextPlaying} numberOfLines={2}>
					{this.props.title}
				</Text>
				<Icon 
					name='more-vert'
					size={30} color='#000'
					onPress={() => this.props.setActiveMenu(this.props.id)}
				/>
			</View>
		);
	}

	renderSong(){
		if(Platform.OS == 'ios'){
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

	render(){
		if(this.props.activeMenuId == this.props.id){
			return this.renderMenu();
		} else {
			return this.renderSong();
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		paused: state.audio.paused,
		current: state.audio,
		id: ownProps.id,
		downloaded: state.downloaded.downloaded,
		title: state.downloaded.downloaded[ownProps.id].title,
		activeMenuId: state.me.activeMenuId,
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
