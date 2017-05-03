import { connect } from 'react-redux';
import MainHeader from '../components/MainHeader';
import { setSearchBar, updateText, updateVideoList, downloading, toggleSearching } from '../actions/action.js';

const mapStateToProps = (state) => {
	return {
		text: state.search.searchText,
		searchBarActive: state.search.searchBarActive,
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

const MainHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(MainHeader);
export default MainHeaderContainer;