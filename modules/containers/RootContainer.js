import { connect } from 'react-redux';
import Root from '../components/Root';
import { updateText, updateSearchList, downloading, toggleSearching } from '../actions/action.js';

const mapStateToProps = (state) => {
	return {
		loggedIn: state.login.loggedIn,
		searchBarActive: state.search.searchBarActive,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// updateText: (text) => {
		// 	dispatch(updateText(text));
		// },
		// toggleSearching: (value) => {
		// 	dispatch(toggleSearching(value));
		// },
		// updateSearchList: (videos) => {
		// 	dispatch(updateSearchList(videos));
		// }
	};
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;