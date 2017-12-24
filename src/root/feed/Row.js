import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import styles from './styles';
import { getDownload, requestFile, getImage } from 'Yuemi/src/lib/get';
import {
	addDownload, toggleDownloading, setActiveDownload,
	shiftDownloadQueue, addToDownloaded, addRequest
} from 'Yuemi/src/action';

class Row extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.listRowText} numberOfLines={2}>
					{this.props.data.title}
				</Text>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeDownload: state.download.activeDownload,
		downloadQueue: state.download.downloadQueue,
		downloaded: state.downloaded.downloaded,
		user: state.user.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addDownload: (obj) => {
			dispatch(addDownload(obj));
		},
		shiftDownloadQueue: () => {
			dispatch(shiftDownloadQueue());
		},
		setActiveDownload: (obj) => {
			dispatch(setActiveDownload(obj));
		},
		addToDownloaded: (obj) => {
			dispatch(addToDownloaded(obj));
		},
		addRequest: (id) => {
			dispatch(addRequest(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
