import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';

import {
	updateText, toggleSearching,
	updateSearchList, downloading
} from 'Yuemi/src/action';
import styles from './styles';
import Music from 'Yuemi/src/root/music/Music';

class Me extends Component {

	constructor({playing}){
		super();
	}

	render(){
		return <Music playlist={_.keys(this.props.downloaded)} navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = (state) => {
	return {
		downloaded: state.downloaded.downloaded,
		playing: state.audio.playing,
	};
};

export default connect(mapStateToProps)(Me);
