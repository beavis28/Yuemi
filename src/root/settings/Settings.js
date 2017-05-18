import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	View, Text, Button, TouchableNativeFeedback,
	TouchableHighlight, Platform, Alert, FlatList
} from 'react-native';

import styles from './styles';
import settings from './data';
import { restoreDefaultSettings, purgeDownloads, purgePlaylists } from 'Yuemi/src/action';

class Settings extends Component {

	constructor(){
		super();
	}

	settingOnClick(action){
		Alert.alert(
			'Are you sure you want to:',
			action + '?',
			[
				{text: 'YES', onPress: () => this.perform(action)},
				{text: 'CANCEL'},
			]
		);
	}

	perform(action){
		switch(action){

		case 'PURGE_DOWNLOADS':
			this._purgeDownloads();
			break;

		case 'RESTORE_DEFAULT_SETTINGS':
			this.props.restoreDefaultSettings();
			break;

		case 'PURGE_PLAYLISTS':
			this.props.purgePlaylists();
			break;

		}
	}

	_purgeDownloads(){
		if(this.props.current.audio != null){
			this.props.current.audio.endMusic();
		}
		const dir = RNFetchBlob.fs.dirs.DocumentDir;
		RNFetchBlob.fs.ls(dir)
		.then((files) => {
			_.forEach(files, (value) => {
				if(value.endsWith('mp3') || value.endsWith('jpg')){ // maybe check downloads instead
					RNFetchBlob.fs.unlink(dir + '/' + value)
					.catch((err) => {
						console.log('ERR: ', err);
					});
				}
			});
			this.props.purgeDownloads();
		});
	}

	getSetting(action, description, icon){
		if(Platform.OS == 'ios'){
			return(
				<TouchableHighlight onPress={() => this.settingOnClick(action)} underlayColor='#ddd'>
					<View style={styles.setting}>
						<Icon
							style={styles.icon}
							name={icon}
						/>
						<Text style={styles.description}>
							{description}
						</Text>
					</View>
				</TouchableHighlight>
			);
		} else {
			return(
				<TouchableNativeFeedback onPress={() => this.settingOnClick(action)}>
					<View style={styles.setting}>
						<Icon
							style={styles.icon}
							name={icon}
						/>
						<Text style={styles.description}>
							{description}
						</Text>
					</View>
				</TouchableNativeFeedback>
			);
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<FlatList
					data={settings}
					renderItem={({item}) => this.getSetting(item.action, item.description, item.icon)}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		downloaded: state.downloaded.downloaded,
		current: state.audio,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		restoreDefaultSettings: () => {
			dispatch(restoreDefaultSettings());
		},
		purgeDownloads: () => {
			dispatch(purgeDownloads());
		},
		purgePlaylists: () => {
			dispatch(purgePlaylists());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
