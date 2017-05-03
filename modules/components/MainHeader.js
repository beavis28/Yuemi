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
				<View style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}>
					<Icon style={{paddingLeft: 15}} name="settings" size={30} color="#fff" onPress={() => this.props.navigation.navigate('Settings')}/>
					<Text style={{paddingLeft: 20, fontWeight: 'bold', color: '#fff', fontSize: 20}}>
						Yuemi
					</Text>
					<Icon style={{paddingLeft: 245}} name="search" size={30} color="#fff" onPress={() => this.props.setSearchBar(true)} />
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
			<View style={{
				backgroundColor: '#ff6666', // #ff6666
				height: 50,
			}}>
				{this.getToRender()}
			</View>
		);
	}
}

export default MainHeader;

