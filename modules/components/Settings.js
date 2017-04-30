import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Settings extends Component {

	constructor({restoreDefaultSettings}){
		super();
	}

	render(){
		return(
			<View>
			      <Button
			        onPress={() => this.props.restoreDefaultSettings()}
			        title={'RESTORE DEFAULT'}
			      />
			      <Button
			        onPress={() => this.props.purgeDownloads()}
			        title={'PURGE DOWNLOADS'}
			      />
			      <Button
			        onPress={() => {console.log('Coming Soon.')}}
			        title={'CONFIGURE SERVER'}
			      />
			</View>
		);
	}
}

export default Settings;