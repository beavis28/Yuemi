import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import styles from './styles';
import { handleDownload, requestFile, getDownload, getImage } from 'Yuemi/src/lib/get';
import {
	addDownloadToQueue, setActiveDownload,
	shiftDownloadQueue, addToDownloaded
} from 'Yuemi/src/action';

class Row extends Component {
	constructor(){
		super();
	}

	downloadInterface(){
		console.log('download interface called');
		handleDownload(
			this.props, this.props.id, this.props.title, this.props.duration,
			this.getDownloadQueue.bind(this), this.getActiveDownload.bind(this)
		);
	}

	getDownloadQueue(){
		return this.props.downloadQueue;
	}

	getActiveDownload(){
		return this.props.activeDownload;
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
					onPress={this.downloadInterface.bind(this)}
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
		} else if(seconds > 3600){
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
		addToDownloaded: (id, title, duration) => {
			dispatch(addToDownloaded(id, title, duration));
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
