import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { getDownload } from '../lib/get';

class VideoListRow extends Component {
	constructor({activeDownload, downloadQueue, shiftDownloadQueue,
					addDownload, downloaded, setActiveDownload, 
					addToDownloaded, title, duration, id
				}){
		super();
	}

	handleDownload(id, title){ // handles all downloading and queueing.
		// NOTE: if app is closed while there are downloads in the queue
		// need to either erase queue or resume queue on next startup.
		// NOTE: if downloaded is cancelled, wil load permanently. Fix.
		// Consider making this into two functions, interface/handler
		// and getter. maybe use a generator.
		// WARNING: Handle downloads is working within one element,
		// handling the downloads for multiple components. Need to move
		// logic to another location.
		// ADD IN REMOVE FILE

		// DO PREPARE DOWNLOAD STAGE, THEN SEND THE OK, THEN EXECUTE THE DOWNLOAD
		// TO TAKE ADVANTAGE OF ASYNC. CONSIDER NOT USING ANDROID DOWNLOAD MANAGER
		const d = {id, title};
		if(Object.keys(this.props.activeDownload).includes('id')){
			this.props.addDownload(d);
		} else {
			this.props.setActiveDownload(d);
			let promise = getDownload(id, title);
			promise.then(() => {
				if(this.props.downloadQueue.length > 0){
					this.props.addToDownloaded(d);
					this.props.setActiveDownload({});
					const dlq = this.props.downloadQueue; // distinction
					// between shared info and component specidic info.
					// close attention to props and recursion.
					const nextDownload = dlq[0];
					this.handleDownload(nextDownload.id, nextDownload.title);
					this.props.shiftDownloadQueue();
				} else {
					this.props.addToDownloaded(d);
					this.props.setActiveDownload({});
				}
			});
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

		if(durList.length == 1){
			seconds += durList[0];
		} else if(durList.length == 2){
			seconds += durList[0]*60 + durList[1];
		} else {
			seconds += 3600;
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
			return (
				<Button
					style={styles.listButton}
					title='PLAY'
					color='#1990B8'
					onPress={() => {console.log('already downloaded.');}}
				/>
			);
		} else if(this.includesId(this.props.id, this.props.downloadQueue)){
			return (
				<Text>
					Waiting.
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