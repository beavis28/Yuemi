import { connect } from 'react-redux';
import { updateText, toggleSearching, updateVideoList, downloading } from '../actions/action.js';

import App from '../components/App.js';

const mapStateToProps = (state) => {
	return {
		text: state.searchText,
		videos: state.videoList,
		isSearching: state.isSearching,
		activeDownloads: state.activeDownloads,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateText: (text) => {
			dispatch(updateText(text));
		},
		toggleSearching: (value) => {
			dispatch(toggleSearching(value));
		},
		downloading: (value) => {
			dispatch(downloading(value));
		},
		updateVideoList: (videos) => {
			dispatch(updateVideoList(videos));
		}
	};
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;