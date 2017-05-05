import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { RootNav } from 'Yuemi/src/root/router';
import Login from 'Yuemi/src/root/login/Login';
import Player from 'Yuemi/src/root/player/Player';

class Root extends Component {

	constructor(){
		super();
	}

	getToRender(){
		if(!this.props.loggedIn){
			return (
				<Login/>
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
					<Player/>
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

const mapStateToProps = (state) => {
	return {
		loggedIn: state.login.loggedIn,
		searchBarActive: state.search.searchBarActive,
	};
};

export default connect(mapStateToProps)(Root);
