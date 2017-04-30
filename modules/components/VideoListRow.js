import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { getDownload, requestFile } from '../lib/get';
import { handleMusic } from '../lib/audio';

class VideoListRow extends Component {
	constructor({activeDownload, downloadQueue, shiftDownloadQueue,
					addDownload, downloaded, setActiveDownload, 
					addRequest, addToDownloaded, title, duration, id,
					requested, setPlaying, playing
				}){
		super();
	}

	handleDownload(id, title){
		const d = {id, title};
		if(Object.keys(this.props.activeDownload).includes('id')){
			this.props.addDownload(d);
		} else {
			this.props.addRequest(id); // Should really be named set_request
			requestFile(id).then(() => {
				this.props.addRequest('');
				this.props.setActiveDownload(d);
				getDownload(id, title).then(() => {
					this.props.addToDownloaded(d);
					this.props.setActiveDownload({});
					if(this.props.downloadQueue.length > 0){
						const dlq = this.props.downloadQueue;
						const nextDownload = dlq[0];
						this.handleDownload(nextDownload.id, nextDownload.title);
						this.props.shiftDownloadQueue(); // NOOOOOOOO ITS SO NESTED!!!
					}
				});
			});
		}
	}

	handlePlay(action){
		if(action == 'play'){
			handleMusic(this.props.playing, this.props.title, this.props.setPlaying);
		} else {
			handleMusic(this.props.playing, '', this.props.setPlaying);
		}
	}

	includesId(id, list){
		for(let i = 0; i < list.length; i++){
			if(list[i].id == id){
				return true;
			}
		}
		return false;
	}

	renderDownloadButton(){
		// While downloading, if video is in activeDownload,
		// render a spinner. Once finished, render button that
		// says 'DOWNLOADED'.
		let seconds = 0;
		let durList = this.props.duration.split(':');
		if(durList.length == 2){
			seconds += parseInt(durList[0])*60 + parseInt(durList[1]);
		} else if(durList.length == 3){
			seconds = 3600;
		}

		if(seconds > 420){
			return (
				<Button
					style={styles.listButton}
					onPress={() => {}}
					title='TOO BIG'
					color='red'
				/>
			);
		} else if(this.props.activeDownload.id == this.props.id){
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
		} else if(this.props.id in this.props.downloaded){
			if(this.props.title == this.props.playing.title){
				return (
					<Button
						style={styles.listButton}
						title='STOP'
						color='#1990B8'
						onPress={() => {this.handlePlay('stop')}}
					/>
				);
			} else {
				return (
					<Button
						style={styles.listButton}
						title='PLAY'
						color='#1990B8'
						onPress={() => {this.handlePlay('play')}}
					/>
				);
			}
		} else if(this.includesId(this.props.id, this.props.downloadQueue)){
			return (
				<Text>
					Waiting.
				</Text>
			);
		} else if(this.props.requested.includes(this.props.id)){
			return (
				<Text>
					Requested.
				</Text>
			);
		} else {
			return (
				<Button
					style={styles.listButton}
					onPress={() => this.handleDownload(this.props.id, this.props.title)}
					title='DOWNLOAD'
					color='#1990B8'
				/>
			);
		}
	}

	render(){
		return (
			<View style={styles.listRow}>
				<Text style={styles.listText}>
					{this.props.title + '\n' + this.props.duration}
				</Text>
				{this.renderDownloadButton()}
			</View>
		);
	}
}

export default VideoListRow;