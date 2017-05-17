import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import styles from './styles';
import Playlist from './Playlist';
import { deletePlaylist } from 'Yuemi/src/action.js';

class Playlists extends Component {

	constructor(){
		super();
	}

	playlistClick(playlist){
		console.log('CLICKED: ', playlist);
		this.props.navigation.navigate('Playlist', {playlist});
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

	getPlaylist(name){
		let playlist = this.props.playlists[name];
		return (
			<View style={styles.playlistContainer}>
				<TouchableWithoutFeedback onPress={() => this.playlistClick(name)}>
					<View
						style={styles.playlistCard}
						elevation={5}
					>
						<View style={styles.cardTop}>
							<View style={[styles.cardQuadrent, styles.cardTR]}>
								<Image
									source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + playlist[0] + '.jpg'}}
									style={styles.cardImage}
								/>
							</View>
							<View style={[styles.cardQuadrent, styles.cardTL]}>
								<Image
									source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + playlist[1] + '.jpg'}}
									style={styles.cardImage}
								/>
							</View>
							<View style={[styles.cardQuadrent, styles.cardBR]}>
								<Image
									source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + playlist[2] + '.jpg'}}
									style={styles.cardImage}
								/>
							</View>
							<View style={[styles.cardQuadrent, styles.cardBL]}>
								<Image
									source={{uri: 'file:///' + RNFetchBlob.fs.dirs.DocumentDir + '/' + playlist[3] + '.jpg'}}
									style={styles.cardImage}
								/>
							</View>
						</View>
						<View style={styles.cardBottom}>
							<Text style={styles.cardText}>{name}</Text>
							<Icon
								style={styles.icon}
								name='more-vert'
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
