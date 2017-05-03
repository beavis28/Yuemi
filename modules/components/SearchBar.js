import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/search';
import { getVideos } from '../lib/get';
import Icon from 'react-native-vector-icons/MaterialIcons';


class SearchBar extends Component {

	constructor({text, updateText, onBlur, toggleSearching, updateVideoList, handleSubmission}){
		super();
	}

	componentDidMount(){
		this.refs.search.focus();
		console.log('focused');
	}

	updateVideos(){
		this.props.toggleSearching(true);
		let videos = getVideos(this.props.text);
		videos.then((videos) => {
			this.props.updateVideoList(videos);
			this.props.toggleSearching(false);
		});
	}

	handleSubmission(){
		if(this.props.text != ''){
			this.updateVideos();
			this.props.navigation.navigate('Search');
			this.props.setSearchBar(false);
			this.props.updateText('');
		}
	}

	render(){
		return(
			<View style={{
				backgroundColor: '#ff6666', // #ff6666
				height: 50,
			}}>
				<TextInput
					ref='search'
					textAlign='left'
					style={styles.textInput}
					placeholderTextColor={'#fff'}
					underlineColorAndroid={'#fff'}
					value = {this.props.text}
					onChangeText = {(text) => this.props.updateText(text)}
					width = {'100%'}
					onSubmitEditing={() => this.handleSubmission()}
					placeholder={'Search for some music.'}
					autoCorrect={false}
					onBlur={() => this.props.setSearchBar(false)}
					autoFocus={true}
				/>
			</View>
		);
	}
}

export default SearchBar;