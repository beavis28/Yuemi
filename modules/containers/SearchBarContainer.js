import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { updateText, updateSearchList, downloading, toggleSearching, setSearchBar } from '../actions/action.js';

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
		updateSearchList: (videos) => {
			dispatch(updateSearchList(videos));
		},
		setSearchBar: (value) => {
			dispatch(setSearchBar(value));
		},
	};
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;