import React, { Component } from 'react';
import VideoListRowContainer from '../containers/VideoListRowContainer';
import styles from '../styles/styles';
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

	componentWillMount(){ // hacky, find another way
		this.props.navigation.navigate('Search');
	}

	updateVideos(){
		this.props.toggleSearching(true);
		let videos = getVideos(this.props.text);
		videos.then((videos) => {
			this.props.updateVideoList(videos);
			this.props.toggleSearching(false);
		});
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
			<View style={styles.container}>
				<View style={styles.textInputContainer}>
					<TextInput
						value = {this.props.text}
						onChangeText = {(text) => this.props.updateText(text)}
						width = {300}
						onSubmitEditing={() => this.updateVideos()}
						placeholder={'Search for some music.'}
						style={styles.textInput}
						selectTextOnFocus={true} //consider removing
					/>
				</View>
				<View
					style={styles.hr}
				/>
				{this.renderList()}
			</View>
		);
	}
}
export default Search;


				// <view style={styles.mainbuttons}>
				// 	<button
				// 		onpress={() => this.updatevideos()}
				// 		title='search'
				// 		color='#841584'
				// 	/>
				// 	<button
				// 		onpress={() => (this.props.updatetext(''))}
				// 		title='clear'
				// 		color='#ff8484'
				// 	/>
				// </view>
