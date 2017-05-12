import React, { Component } from 'react';
import {
	View, Text, FlatList, Image,
	TouchableWithoutFeedback,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';

import styles from './styles';
import Music from 'Yuemi/src/root/music/Music';

class Playlist extends Component {

	constructor(){
		super();
	}

	render(){
		return <Music playlist={this.props.navigation.state.params.playlist} navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
