import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { updateText, updateVideoList, downloading, toggleSearching, setSearchBar } from '../actions/action.js';

const mapStateToProps = (state) => {
	return {
		text: state.search.searchText,
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
		updateVideoList: (videos) => {
			dispatch(updateVideoList(videos));
		},
		setSearchBar: (value) => {
			dispatch(setSearchBar(value));
		},
	};
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;