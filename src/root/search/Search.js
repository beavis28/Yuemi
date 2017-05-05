import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList,
	ActivityIndicator
} from 'react-native';

import Row from './Row';
import styles from './styles';
import {
	updateText, toggleSearching,
	updateSearchList, downloading
} from 'Yuemi/src/action';

class Search extends Component {

	constructor(){
		super();
	}

	_renderItem(item){
		return (
			<Row
				id={item.id}
				title={item.title}
				duration={item.duration}
			/>
		);
	}

	renderList(){
		if(this.props.isSearching){
			return (
				<ActivityIndicator
					size='large'
					animating={true}
					style={styles.activityIndicator}
				/>
			);
		} else if(this.props.videos.length > 0) {
			return (
				<FlatList
					style={styles.list}
					data={this.props.videos}
					renderItem={({item}) => this._renderItem(item)}
					keyExtractor={(item, index) => index}
				/>
			);
		}
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				{this.renderList()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		videos: state.search.videoList,
		isSearching: state.search.isSearching,
		activeDownloads: state.download.activeDownloads,
		downloaded: state.downloaded.downloaded,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);