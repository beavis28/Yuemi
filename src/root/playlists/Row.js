import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import {
	View, Text, ActivityIndicator, Platform,
	TouchableHighlight, TouchableNativeFeedback
} from 'react-native';

import styles from './styles';
import {
	addToPlaylist,
} from 'Yuemi/src/action';

class Row extends Component {
	constructor(){
		super();
	}

	addSong(){
		this.props.addToPlaylist(this.props.title, this.props.song);
	}

	getContent(){
		return (
			<View style={styles.playlist}>
				<Icon
					style={styles.icon}
					name='playlist-add'
				/>
				<Text style={styles.description}>
					{this.props.title}
				</Text>
			</View>
		);
	}

	getPlaylist(){
		if(Platform.OS == 'ios'){
			return(
				<TouchableHighlight onPress={() => this.addSong()} underlayColor='#ddd'>
					{this.getContent()}
				</TouchableHighlight>
			);
		} else {
			return(
				<TouchableNativeFeedback onPress={() => this.addSong()}>
					{this.getContent()}
				</TouchableNativeFeedback>
			);
		}
	}

	render(){
		if(_.includes(this.props.playlists[this.props.title], this.props.song)){
			return (
				<View style={styles.container}>
					<View style={styles.playlist}>
						<Text style={styles.description}>
							{this.props.title}
						</Text>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					{this.getPlaylist()}
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		playlists: state.playlist.playlists,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToPlaylist: (list, song) => {
			dispatch(addToPlaylist(list, song));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
