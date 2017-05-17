import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';

import styles from './styles';
import Music from 'Yuemi/src/root/music/Music';

class Playlist extends Component {

	constructor(){
		super();
	}

	render(){
		console.log('ON PLAYLISTS');
		console.log(this.props.navigation.state.params.playlist);
		let playlistName = this.props.navigation.state.params.playlist;
		let playlist = this.props.playlists[playlistName];
		return <Music playlist={playlist} navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = (state) => {
	return {
		playlists: state.playlist.playlists,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
