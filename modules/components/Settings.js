import React, { Component } from 'react';
import { View, Text, Button, TouchableNativeFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/settings';

class Settings extends Component {

	constructor({purgeDownloads, restoreDefaultSettings}){
		super();
	}

	settingOnClick(action){
		Alert.alert(
			'Are you sure you want to:',
			action + '?',
			[
				{text: 'YES', onPress: () => this.perform(action)},
				{text: 'NO'},
				{text: 'CANCEL'},
			]
		);
	}

	perform(action){
		switch(action){

		case 'PURGE_DOWNLOADS':
			this.props.purgeDownloads();
			break;

		case 'RESTORE_DEFAULT_SETTINGS':
			this.props.restoreDefaultSettings();

		}
	}

	render(){
		return(
			<View style={styles.container}>

				<TouchableNativeFeedback onPress={() => this.settingOnClick('PURGE_DOWNLOADS')}>
					<View style={styles.subcontainer}>
						<Icon
							style={styles.icon}
							name='clear'
						/>
						<Text style={styles.text}>
							Purge Downloads
						</Text>
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={() => this.settingOnClick('RESTORE_DEFAULT_SETTINGS')}>
					<View style={styles.subcontainer}>
						<Icon
							style={styles.icon}
							name='clear'
						/>
						<Text style={styles.text}>
							Restore Default Settings
						</Text>
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={() => console.log('coming soon')}>
					<View style={styles.subcontainer}>
						<Icon
							style={styles.icon}
							name='image'
						/>
						<Text style={styles.text}>
							Display Images on Search
						</Text>
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={() => console.log('coming soon')}>
					<View style={styles.subcontainer}>
						<Icon
							style={styles.icon}
							name='cloud'
						/>
						<Text style={styles.text}>
							Source From Soundcloud
						</Text>
					</View>
				</TouchableNativeFeedback>

			</View>
		);
	}
}

export default Settings;
