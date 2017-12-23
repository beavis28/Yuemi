import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { RootNav } from 'Yuemi/src/root/router';
import Login from 'Yuemi/src/root/login/Login';
import Player from 'Yuemi/src/root/player/Player';
class Root extends Component {

	constructor() {
		super();
	}

	getToRender() {
		if (!this.props.loggedIn) {
			return (
				<Login />
			);
		} else if (this.props.searchBarActive) {
			return (
				<View style={{ flex: 1 }}>
					<RootNav style={{ flex: 7 }} />
				</View>
			);
		} else {
			if (this.props.audio != null) {
				return (
					<View style={{ flex: 1 }}>
						<RootNav style={{ flex: 7 }} />
						<Player />
					</View>
				);
			} else {
				return (
					<View style={{ flex: 1 }}>
						<RootNav style={{ flex: 1 }} />
					</View>
				);
			}
		}
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#ff6666', elevation: 0 }}>
				{this.getToRender()}
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.login.loggedIn,
		searchBarActive: state.search.searchBarActive,
		audio: state.audio.audio,
	};
};

export default connect(mapStateToProps)(Root);
