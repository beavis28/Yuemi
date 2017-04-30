import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { getDownload, requestFile } from '../lib/get';

class VideoListRow extends Component {
	constructor({activeDownload, downloadQueue, shiftDownloadQueue,
					addDownload, downloaded, setActiveDownload, 
					addRequest, addToDownloaded, title, duration, id,
					requested
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

		// APP SEVERAL PAGES WORKS OKAY, BUT CURR PAGE DOWNLOAD GETS CANCELLED
		// WHEN PREV PAGE DOWNLOAD IS ACTIVATED.
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
						const dlq = this.props.downloadQueue; // distinction
						// between shared info and component specific info.
						// close attention to props and recursion.
						const nextDownload = dlq[0];
						this.handleDownload(nextDownload.id, nextDownload.title);
						this.props.shiftDownloadQueue();
					}
				});
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
		console.log(this.props.activeDownload.id);
		console.log(this.props.id);
		console.log(this.props.title);
		console.log(this.props.activeDownload.id == this.props.id);
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
			console.log('IF STATEMENT ONE');
			return (
				<Button
					style={styles.listButton}
					onPress={() => {}}
					title='TOO BIG'
					color='red'
				/>
			);
		} else if(this.props.activeDownload.id == this.props.id){
			console.log('IF STATEMENT TWO');
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
		} else if(this.props.id in this.props.downloaded){
			console.log('IF STATEMENT THREE');
			return (
				<Button
					style={styles.listButton}
					title='PLAY'
					color='#1990B8'
					onPress={() => {console.log('already downloaded.');}}
				/>
			);
		} else if(this.includesId(this.props.id, this.props.downloadQueue)){
			console.log('IF STATEMENT FOUR');
			return (
				<Text>
					Waiting.
				</Text>
			);
		} else if(this.props.requested.includes(this.props.id)){
			console.log('IF STATEMENT FIVE');
			return (
				<Text>
					Requested.
				</Text>
			);
		} else {
			console.log('IF STATEMENT SIX');
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