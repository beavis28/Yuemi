import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import styles from './styles';
import Music from 'Yuemi/src/root/music/Music';

class Playlist extends Component {

	constructor(){
		super();
	}

	getDefaultImage(num){
		return (
			<View style={[styles.cardQuadrent, styles['card' + num], styles.defaultImage]}>
				<Icon 
					name='music-circle'
					size={65}
					color='#999'
				/>
			</View>
		);
	}

	getImage(num, name){
		let playlist = this.props.playlists[name];
		if(playlist[num] != undefined){
			let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + playlist[num] + '.jpg';
			return (
				<View style={[styles.cardQuadrent, styles['card' + num]]}>
					<Image
						source={{uri: 'file:///' + path}}
						style={styles.cardImage}
					/>
				</View>
			);
		} else {
			return this.getDefaultImage(num);
		}
	}

	getHeader(name){
		return (
			<View style={{height: 200}}>
				<View style={styles.playlistHeader}>
					{this.getImage(0, name)}
					{this.getImage(1, name)}
					{this.getImage(2, name)}
					{this.getImage(3, name)}
				</View>
			</View>
		);
	}

	render(){
		let name = this.props.navigation.state.params.playlist;
		let playlist = this.props.playlists[name];
		return (
			<View style={{flex: 1}}>
				<Music playlist={playlist} navigation={this.props.navigation} header={this.getHeader.bind(this, name)}/>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
