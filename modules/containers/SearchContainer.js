import { connect } from 'react-redux';
import { updateText, toggleSearching, updateVideoList, downloading } from '../actions/action.js';

import Search from '../components/Search.js';

const mapStateToProps = (state) => {
	return {
		text: state.search.searchText,
		videos: state.search.videoList,
		isSearching: state.search.isSearching,
		activeDownloads: state.app.activeDownloads,
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

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchContainer;