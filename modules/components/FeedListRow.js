import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	ActivityIndicator,
	TouchableNativeFeedback,
	Image
} from 'react-native';
import styles from '../styles/myMusic';
import { handleMusic, pauseMusic, resumeMusic } from '../lib/audio';
import RNFetchBlob from 'react-native-fetch-blob';

class FeedListRow extends Component {

	constructor({current, songs, title, id, setPlaying, updateTime, updatePaused, paused}){
		super();
	}

	getToRender(){
		if(this.props.current.title == this.props.title){
			return (
				<View style={styles.listRow}>
					<Image
						source={{uri: 'file:///' + RNFetchBlob.fs.dirs.PictureDir + '/' + this.props.id + '.jpg'}}
						style={{
							width: 50,
							height: 50,
							marginLeft: 15,
						}}
					/>
					<Text style={styles.listTextPlaying} numberOfLines={2}>
						{this.props.title}
					</Text>
				</View>
			);
		} else {
			return (
				<View style={styles.listRow}>
					<Image
						source={{uri: 'file:///' + RNFetchBlob.fs.dirs.PictureDir + '/' + this.props.id + '.jpg'}}
						style={{
							width: 50,
							height: 50,
							marginLeft: 15,
						}}
					/>
					<Text style={styles.listText} numberOfLines={2}>
						{this.props.title}
					</Text>
				</View>
			);
		}
	}

	render(){
		return (
			<TouchableNativeFeedback onPress={() => console.log('touched')}>
				{this.getToRender()}
			</TouchableNativeFeedback>
		);
	}
}

export default FeedListRow;