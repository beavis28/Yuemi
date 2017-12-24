import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View, Button, TextInput, FlatList,
	ActivityIndicator
} from 'react-native';

import Row from './Row';
import styles from './styles';
import { getVideos, getFeed } from 'Yuemi/src/lib/get';
import {
	updateText, toggleSearching, updateSearchList,
	downloading, updateFeed,
} from 'Yuemi/src/action';

class Feed extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		this._onRefresh();
	}

	_onRefresh() {
		let feedList = [];
		getFeed()
			.then((json) => {
				json.forEach((elem) => feedList.push({ title: elem.title, users: elem.users, duration: elem.duration }));
				this.props.updateFeed(feedList);
			});
	}

	renderSeparator() {
		return (
			<View style={{
				height: 1,
				backgroundColor: '#fff',
				width: '100%',
			}} />
		);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<FlatList
					style={styles.list}
					data={this.props.feedList}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) => <Row data={item} />}
					onRefresh={this._onRefresh.bind(this)}
					refreshing={false}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		feedList: state.feed.feedList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFeed: (feedList) => {
			dispatch(updateFeed(feedList));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
