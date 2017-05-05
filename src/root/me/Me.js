import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';

import {
	updateText, toggleSearching,
	updateSearchList, downloading
} from 'Yuemi/src/action';
import Row from './Row';
import styles from './styles';

class Me extends Component {

	constructor({playing}){
		super();
	}

	render(){
		return(
			<View style={styles.myMusicContainer}>
				<FlatList
					data={_.keys(this.props.downloaded)}
					renderItem={({item}) => <Row id={item}/>}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		downloaded: state.downloaded.downloaded,
		playing: state.audio.playing,
	};
};

export default connect(mapStateToProps)(Me);
