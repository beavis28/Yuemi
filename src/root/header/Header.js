import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import styles from './styles';
import { getVideos } from 'Yuemi/src/lib/get';
import SearchBar from './SearchBar';
import {
	setSearchBar, updateText, updateSearchList,
	downloading, toggleSearching
} from 'Yuemi/src/action';


class Header extends Component {

	constructor({text, setSearchBar, searchBarActive}){
		super();
	}

	getToRender(){
		if(!this.props.searchBarActive){
			return(
				<View style={styles.header}>
					<View style={styles.leftContainer}>
						<Icon name="settings" size={30} color="#fff" onPress={() => this.props.navigation.navigate('Settings')}/>
						<Text style={styles.headerText}>
							Yuemi
						</Text>
					</View>
					<Icon name="search" size={30} color="#fff" onPress={() => this.props.setSearchBar(true)} />
				</View>
			);
		} else {
			return (
				<SearchBar navigation={this.props.navigation} />
			);
		}
	}

	render(){
		return(
			<View style={styles.mainHeaderContainer}>
				{this.getToRender()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		text: state.search.searchText,
		searchBarActive: state.search.searchBarActive,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateText: (text) => {
			dispatch(updateText(text));
		},
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
