import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/feed';
import { getDownload, requestFile, getImage } from '../lib/get';

class FeedListRow extends Component {
	constructor(){
		super();
	}

	render(){
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.userText}>
					{this.props.data.users[0]}
					{this.props.data.users.length > 1 ? ' +' + (this.props.data.users.length-1) + ' other(s) downloaded:' : ' downloaded:'}
				</Text>
				<Text style={styles.listRowText} numberOfLines={2}>
					{this.props.data.title}
				</Text>
				<Text style={styles.listRowText}>
					{this.props.data.duration}
				</Text>
			</View>
		);
	}
}

export default FeedListRow;