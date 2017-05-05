import React, { Component } from 'react';
import FeedListRowContainer from '../containers/FeedListRowContainer';
import styles from '../styles/feed';
import { getVideos, getFeed } from '../lib/get';

import {
	View,
	Button,
	TextInput,
	FlatList,
	ActivityIndicator
} from 'react-native';

import {
	addNavigationHelpers,
	StackNavigator,
	TabNavigator
} from 'react-navigation';

class Feed extends Component {

	constructor({text, feedList}){
		super();
	}

	componentDidMount(){
		this.props.navigation.navigate('Feed');
		getFeed(this.props.updateFeed);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<FlatList
					style={styles.list}
					data={this.props.feedList}
					renderItem={({item}) => <FeedListRowContainer data={item}/>}
				/>
			</View>
		);
	}
}
export default Feed;







