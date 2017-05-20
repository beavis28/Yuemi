import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	View, Text, FlatList, ActivityIndicator,
	Platform, TouchableHighlight, TouchableNativeFeedback
} from 'react-native';

import styles from './styles';
import Row from './Row';
import CreatePlaylist from './CreatePlaylist';

class EditPlaylists extends Component {

	constructor(){
		super();
		this.state = {
			modalVisible: false,
		};
	}

	getContent(){
		return (
			<View style={styles.create}>
				<Text style={styles.createText}>
					Create New Playlist
				</Text>
			</View>
		);
	}

	_setModal(b){
		this.setState({modalVisible: b});
	}

	getCreate(){
		if(Platform.OS == 'ios'){
			return(
				<TouchableHighlight onPress={() => this._setModal(true)} underlayColor='#ddd'>
					{this.getContent()}
				</TouchableHighlight>
			);
		} else {
			return(
				<TouchableNativeFeedback onPress={() => this._setModal(true)}>
					{this.getContent()}
				</TouchableNativeFeedback>
			);
		}
	}

	render(){
		return (
			<View style={styles.container}>
				<CreatePlaylist setModal={this._setModal.bind(this)} visible={this.state.modalVisible} />
				{this.getCreate()}
				<FlatList
					data={_.keys(this.props.playlists)}
					renderItem={({item}) => <Row playlistName={item} navigation={this.props.navigation} song={this.props.navigation.state.params.song}/>}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playlists: state.playlist.playlists,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaylists);
