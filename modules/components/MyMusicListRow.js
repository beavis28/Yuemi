import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { handleMusic } from '../lib/audio';

class MyMusicListRow extends Component {

	constructor({songs, playing, setPlaying}){
		super();
	}


	renderPlayButton(){
		if(this.props.playing.title == this.props.title){
			return (
				<Button
					style={styles.listButton}
					title='STOP'
					color='#1990B8'
					onPress={() => {handleMusic(this.props.playing, '', this.props.setPlaying)}}
				/>
			);
		} else {
			return (
				<Button
					style={styles.listButton}
					title='PLAY'
					color='#1990B8'
					onPress={() => {handleMusic(this.props.playing, this.props.title, this.props.setPlaying)}}
				/>
			);
		}
	}

	render(){
		return (
			<View style={styles.listRow}>
				<Text style={styles.listText}>
					{this.props.title + '\n' + this.props.id}
				</Text>
				{this.renderPlayButton()}
			</View>
		);
	}
}

export default MyMusicListRow;