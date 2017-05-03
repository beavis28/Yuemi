import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { RootNav } from '../routes/router';
import LoginContainer from '../containers/LoginContainer';
import BottomPlayerContainer from '../containers/BottomPlayerContainer';

class Root extends Component {

	constructor(){
		super();
	}

	getToRender(){
		console.log(this.props.app);
		if(!this.props.loggedIn){
			return (
				<LoginContainer/>
			);
		} else if(this.props.searchBarActive){
			return (
				<View style={{flex: 1}}>
					<RootNav style={{flex: 7}}/>
				</View>
			);
		} else {
			return (
				<View style={{flex: 1}}>
					<RootNav style={{flex: 7}}/>
					<BottomPlayerContainer/>
				</View>
			);
		}
	}

	render(){
		return(
			<View style={{flex: 1}}>
				{this.getToRender()}
			</View>
		);
	}
}

export default Root;
