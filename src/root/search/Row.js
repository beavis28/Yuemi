import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import styles from './styles';
import { requestFile, getDownload, getImage } from 'Yuemi/src/lib/get';
import {
	addDownloadToQueue, setActiveDownload,
	shiftDownloadQueue, addToDownloaded
} from 'Yuemi/src/action';

class Row extends Component {
	constructor(){
		super();
	}

	handleDownload(id, title, duration){
		if(this.props.downloadQueue.includes({ id, title, duration })){
			return;
		}
		if(this.props.activeDownload != null){
			this.props.addDownloadToQueue({id, title, duration});
		} else {
			this.props.setActiveDownload(id);
			requestFile(id)
		.then(() => {
			return getDownload(id, title, this.props.user, duration);
		})
		.then(() => {
			this.props.addToDownloaded(id, {title, duration});
			this.props.setActiveDownload(null);
			getImage(id);
			if(this.props.downloadQueue.length > 0){
				const next = this.props.downloadQueue[0];
				this.props.shiftDownloadQueue();
				this.handleDownload(next.id, next.title, next.duration);
			}
		})
		.catch((err) => {
			console.log(err);
			this.props.setActiveDownload(null);
		});
		}
	}

	renderDownloadButton(){
		const { id, title, duration } = this.props;
		if(this.props.activeDownload == this.props.id){
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
		} else if(_.find(this.props.downloadQueue, {id})){
			return (
				<Icon 
					name='access-time'
					size={30} color='#1990B8'
				/>
			);
		} else {
			return (
				<Icon 
					name='file-download'
					size={30} color='#1990B8'
					onPress={() => this.handleDownload(this.props.id, this.props.title, this.props.duration)}
				/>
			);
		}
	}

	getToRender(){
		// a lot of repeated code. make cleaner.
		let seconds = 0;
		let durList = this.props.duration.split(':');
		if(durList.length == 2){
			seconds += parseInt(durList[0])*60 + parseInt(durList[1]);
		} else if(durList.length == 3){
			seconds = 3600;
		} // move to own function

		if(this.props.downloaded.hasOwnProperty(this.props.id)){
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
			<View style={styles.listRowContainer}>
				{this.getToRender()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeDownload: state.download.activeDownload,
		downloadQueue: state.download.downloadQueue,
		downloaded: state.downloaded.downloaded,
		user: state.user.username
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToDownloaded: (id, obj) => {
			dispatch(addToDownloaded(id, obj));
		},
		setActiveDownload: (id) => {
			dispatch(setActiveDownload(id));
		},
		addDownloadToQueue: (obj) => {
			dispatch(addDownloadToQueue(obj));
		},
		shiftDownloadQueue: () => {
			dispatch(shiftDownloadQueue());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
