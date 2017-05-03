import React, { Component } from 'react';
import styles from '../styles/myMusic';
import FeedListRowContainer from '../containers/FeedListRowContainer';
import RNFetchBlob from 'react-native-fetch-blob';
import { getFeed } from '../lib/get';
import {
	View,
	Text,
	Button,
	FlatList
} from 'react-native';

class Feed extends Component {

	constructor({playing}){
		super();
	}

	componentDidMount(){ // development only
		this.props.navigation.navigate('Feed');
		this.getFeedList();
	}

	getFeedList(){
		getFeed(this.props.updateFeed);
	}

	render(){
		return(
			<View style={styles.myMusicContainer}>
				<FlatList
					data={this.props.feedList}
					renderItem={({item}) => <Text>{item.id + ', ' + item.title + ', ' + item.users + ', ' + item.duration}</Text>}
				/>
			</View>
		);
	}
}

export default Feed;
