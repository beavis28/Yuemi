import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { getVideos } from 'Yuemi/src/lib/get';
import {
	updateText, updateSearchList, downloading,
	toggleSearching, setSearchBar
} from 'Yuemi/src/action';

class SearchBar extends Component {

	constructor(){
		super();
		this.state = {text: ''};
	}

	componentDidMount(){
		this.refs.search.focus();
	}

	updateVideos(){
		this.props.toggleSearching(true);
		getVideos(this.state.text)
	.then((videos) => {
		this.props.updateSearchList(videos);
		this.props.toggleSearching(false);
	});
	}

	handleSubmission(){
		if(this.state.text != ''){
			this.updateVideos();
			this.props.navigation.navigate('Search');
			this.props.setSearchBar(false);
			this.setState({text: ''});
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
					value = {this.state.text}
					onChangeText = {(text) => this.setState({text})}
					width = '100%'
					onSubmitEditing={() => this.handleSubmission()}
					placeholder={'Search for some music.'}
					autoCorrect={false}
					onBlur={() => this.props.setSearchBar(false)}
					autoFocus={true}
					autoCapitalize='none'
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSearching: (value) => {
			dispatch(toggleSearching(value));
		},
		updateSearchList: (videos) => {
			dispatch(updateSearchList(videos));
		},
		setSearchBar: (value) => {
			dispatch(setSearchBar(value));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);