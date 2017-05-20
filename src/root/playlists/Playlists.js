import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import styles from './styles';
import Playlist from './Playlist';
import { deletePlaylist } from 'Yuemi/src/action.js';

class Playlists extends Component {

	constructor(){
		super();
	}

	playlistClick(playlist){
		this.props.navigation.navigate('Playlist', { playlist });
	}

	moreClick(name){
		Alert.alert(
			'Delete Playlist',
			'Are you sure you want to delete this playlist?',
			[
				{text: 'YES', onPress: () => this.props.deletePlaylist(name)},
				{text: 'CANCEL'},
			]
		);
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

	getPlaylist(name){
		console.log('PLAYLIST_ROW_RENDERING');
		return (
			<View style={styles.playlistContainer}>
				<TouchableWithoutFeedback onPress={() => this.playlistClick(name)}>
					<View
						style={styles.playlistCard}
						elevation={3}
					>
						<View style={styles.cardTop}>
							{this.getImage(0, name)}
							{this.getImage(1, name)}
							{this.getImage(2, name)}
							{this.getImage(3, name)}
						</View>
						<View style={styles.cardBottom}>
							<Text style={styles.cardText}>{name}</Text>
							<Icon
								style={styles.icon}
								name='dots-vertical'
								onPress={() => this.moreClick(name)}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}

	render(){
		return(
			<View style={styles.playlistsContainer}>
				<FlatList
					data={_.keys(this.props.playlists)}
					renderItem={({item}) => this.getPlaylist(item)}
					keyExtractor={(item, index) => index}
					numColumns={2}
				/>
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
		deletePlaylist: (name) => {
			dispatch(deletePlaylist(name));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
