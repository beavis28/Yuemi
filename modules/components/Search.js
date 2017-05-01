import React, { Component } from 'react';
import VideoListRowContainer from '../containers/VideoListRowContainer';
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
				toggleSearching, isSearching, updateVideoList,
				downloading, isDownloading}){
		super();
	}

	updateVideos(){
		if(this.props.text != ''){
			this.props.toggleSearching(true);
			let videos = getVideos(this.props.text);
			videos.then((videos) => {
				this.props.updateVideoList(videos);
				this.props.toggleSearching(false);
			});
		}
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
					data={this.props.videos}
					renderItem={({item}) => <VideoListRowContainer data={item}/>}
					ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
				/>
			);
		}
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<TextInput
					style={styles.textInput}
					placeholderTextColor={'#fff'}
					underlineColorAndroid={'#fff'}
					value = {this.props.text}
					onChangeText = {(text) => this.props.updateText(text)}
					width = {'100%'}
					onSubmitEditing={() => this.updateVideos()}
					placeholder={'Search for some music.'}
					selectTextOnFocus={true}
				/>
				{this.renderList()}
			</View>
		);
	}
}
export default Search;