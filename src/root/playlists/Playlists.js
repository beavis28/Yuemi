import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';

import styles from './styles';
import _ from 'lodash';

class Playlists extends Component {

	constructor(){
		super();
	}

	componentDidMount(){
		this.props.navigation.navigate('Playlists');
	}

	playlistClick(playlist){
		console.log(playlist);
	}

	getPlaylist(name){
		let playlist = this.props.playlists[name];
		console.log('PLAYLIST: ', playlist);
		return (
			<View style={styles.playlistContainer}>
				<TouchableWithoutFeedback onPress={() => this.playlistClick(playlist)}>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
