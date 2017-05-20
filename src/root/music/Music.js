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
import EditSong from 'Yuemi/src/root/music/EditSong';
import styles from './styles';

class Music extends Component {

	constructor({playing}){
		super();
		this.state = {
			visible: false,
			id: '',
		}
	}

	editSong(id){
		this.setState({
			visible: true,
			id
		});
	}

	closeModal(title, artist){
		this.setState({
			visible: false,
			id: ''
		});
	}

	renderModal(){
		if(this.state.id != ''){
			return (
				<EditSong visible={this.state.visible} id={this.state.id} closeModal={this.closeModal.bind(this)}/>
			)
		} else {
			return;
		}
	}

	render(){
		return (
			<View style={styles.myMusicContainer}>
				{this.renderModal()}
				<FlatList
					data={this.props.playlist}
					renderItem={({item}) => <Row id={item} playlist={this.props.playlist} navigation={this.props.navigation} editSong={this.editSong.bind(this)}/>}
					keyExtractor={(item, index) => index}
					ListHeaderComponent={this.props.header}
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

export default connect(mapStateToProps)(Music);
