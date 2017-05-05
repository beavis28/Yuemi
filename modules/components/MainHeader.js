import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/search';
import { getVideos } from '../lib/get';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBarContainer from '../containers/SearchBarContainer';

class MainHeader extends Component {

	constructor({text, setSearchBar, searchBarActive}){
		super();
	}

	getToRender(){
		if(!this.props.searchBarActive){
			return(
				<View style={styles.mainHeader}>
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
				<SearchBarContainer navigation={this.props.navigation} />
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

export default MainHeader;

