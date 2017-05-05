import React, { Component } from 'react';
import SearchListRowContainer from '../containers/SearchListRowContainer';
import styles from '../styles/search';
import { getVideos } from '../lib/get';

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

class Search extends Component {

	constructor({text, videos, updateText,
				toggleSearching, isSearching, updateSearchList,
				downloading, isDownloading}){
		super();
	}

	renderList(){
		if(this.props.isSearching){
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
		} else if(this.props.videos.length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={this.props.videos}
					renderItem={({item}) => <SearchListRowContainer data={item}/>}
					ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
				/>
			);
		}
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				{this.renderList()}
			</View>
		);
	}
}
export default Search;