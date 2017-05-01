import React, { Component } from 'react';
//import { AsyncStorage } from 'react-native';
import styles from '../styles/myMusic';
import MyMusicListRowContainer from '../containers/MyMusicListRowContainer';
import RNFetchBlob from 'react-native-fetch-blob';
import BottomPlayerContainer from '../containers/BottomPlayerContainer';
import {
	View,
	Text,
	Button,
	FlatList
} from 'react-native';

class MyMusic extends Component {

	constructor({playing}){
		super();
	}

	componentWillMount(){
		this.props.navigation.navigate('MyMusic');
	}

	getMusicList(){
		const songs = this.props.songs;
		const keys = Object.keys(songs);
		let musicList = [];
		let id;
		let title;
		for(let i = 0; i < keys.length; i++){
			id = keys[i];
			title = songs[id].title;
			musicList.push({id, title});
		}
		return musicList;
	}

	render(){
		return(
			<View style={styles.myMusicContainer}>
				<View style={styles.songsContainer}>
					<FlatList
						style={{
							width: '103.5%',
						}}
						data={this.getMusicList()}
						renderItem={({item}) => <MyMusicListRowContainer song={item}/>}
					/>
				</View>
				<BottomPlayerContainer/>
			</View>
		);
	}
}

export default MyMusic;
//ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
