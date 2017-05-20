import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {
	View, Text, ActivityIndicator, Platform,
	TouchableHighlight, TouchableNativeFeedback
} from 'react-native';

import styles from './styles';
import {
	addToPlaylist, removeFromPlaylist,
} from 'Yuemi/src/action';

class Row extends Component {
	constructor(){
		super();
	}

	onPlaylistPress(){
		if(this.songIsIn()){
			this.removeSong();
		} else {
			this.addSong();
		}
	}

	addSong(){
		this.props.addToPlaylist(this.props.playlistName, this.props.song);
	}

	removeSong(){
		this.props.removeFromPlaylist(this.props.playlistName, this.props.song);
	}

	songIsIn(){
		return _.includes(this.props.playlists[this.props.playlistName], this.props.song);
	}

	getContent(){
		return (
			<View style={styles.playlist}>
				<Icon
					style={styles.icon}
					name={this.songIsIn() ? 'playlist-minus' : 'playlist-plus'}
				/>
				<Text style={styles.description}>
					{this.props.playlistName}
				</Text>
			</View>
		);
	}

	getPlaylist(){
		if(Platform.OS == 'ios'){
			return(
				<TouchableHighlight onPress={() => this.onPlaylistPress()} underlayColor='#ddd'>
					{this.getContent()}
				</TouchableHighlight>
			);
		} else {
			return(
				<TouchableNativeFeedback onPress={() => this.onPlaylistPress()}>
					{this.getContent()}
				</TouchableNativeFeedback>
			);
		}
	}

	render(){
		return (
			<View style={styles.container}>
				{this.getPlaylist()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playlists: state.playlist.playlists,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToPlaylist: (list, song) => {
			dispatch(addToPlaylist(list, song));
		},
		removeFromPlaylist: (list, song) => {
			dispatch(removeFromPlaylist(list, song));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
