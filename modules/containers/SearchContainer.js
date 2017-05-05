import { connect } from 'react-redux';
import { updateText, toggleSearching, updateSearchList, downloading } from '../actions/action.js';

import Search from '../components/Search.js';

const mapStateToProps = (state) => {
	return {
		videos: state.search.videoList,
		isSearching: state.search.isSearching,
		activeDownloads: state.app.activeDownloads,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		downloading: (value) => {
			dispatch(downloading(value));
		},
	};
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchContainer;