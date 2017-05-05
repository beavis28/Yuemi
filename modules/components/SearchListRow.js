import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles/searchListRow';
import { getDownload, requestFile, getImage } from '../lib/get';
import { handleMusic } from '../lib/audio';

class SearchListRow extends Component {
	constructor({activeDownload, downloadQueue, shiftDownloadQueue,
					addDownload, downloaded, setActiveDownload, 
					addRequest, addToDownloaded, title, duration, id,
					requested, user
				}){
		super();
	}

	handleDownload(){
		// move logic out of component
		// also this is just ugly as hell.
		let id = this.props.id;
		let title = this.props.title;
		const d = {id, title};
		if(Object.keys(this.props.activeDownload).includes('id')){
			this.props.addDownload(d);
		} else {
			this.props.addRequest(id); // Should really be named set_request
			requestFile(id).then(() => {
				this.props.addRequest('');
				this.props.setActiveDownload(d);
				getDownload(id, title, this.props.user, this.props.duration).then(() => {
					this.props.addToDownloaded(d);
					this.props.setActiveDownload({});
					getImage(id);
					if(this.props.downloadQueue.length > 0){
						const dlq = this.props.downloadQueue;
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
		if(this.props.activeDownload.id == this.props.id){
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
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
					onPress={() => this.handleDownload()}
					title='DOWNLOAD'
					color='#1990B8'
				/>
			);
		}
	}



	getToRender(){
		let seconds = 0;
		let durList = this.props.duration.split(':');
		if(durList.length == 2){
			seconds += parseInt(durList[0])*60 + parseInt(durList[1]);
		} else if(durList.length == 3){
			seconds = 3600;
		}

		if(this.props.id in this.props.downloaded){
			return (
				<View style={[styles.disabledListRow, {backgroundColor: '#c4daff'}]}>
					<View style={styles.disabledListRowTextContainer}>
						<Text style={styles.disabledListRowText} numberOfLines={2}>
							{this.props.title}
						</Text>
						<Text style={styles.disabledListRowText}>
							{this.props.duration}
						</Text>
					</View>
				</View>
			);
		} else if(seconds > 500){
			return (
				<View style={[styles.disabledListRow, {backgroundColor: '#ffaaaa'}]}>
					<View style={styles.disabledListRowTextContainer}>
						<Text style={styles.disabledListRowText} numberOfLines={2}>
							{this.props.title}
						</Text>
						<Text style={styles.disabledListRowText}>
							{this.props.duration}
						</Text>
					</View>
				</View>
			);
		} else {
			return ( // Fix styling
				<View style={styles.listRow}>
					<View style={styles.listRowTextSubcontainer}>
						<View style={styles.listRowTextContainer}>
							<Text style={styles.listRowText} numberOfLines={2}>
								{this.props.title}
							</Text>
							<Text style={styles.listRowText}>
								{this.props.duration}
							</Text>
						</View>
					</View>
					<View style={styles.downloadButtonContainer}>
						{this.renderDownloadButton()}
					</View>
				</View>
			);
		}
	}

	render(){
		return (
			<View style={styles.mainContainer}>
				{this.getToRender()}
			</View>
		);
	}
}

export default SearchListRow;