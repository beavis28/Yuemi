import { connect } from 'react-redux';
import Root from '../components/Root';
import { updateText, updateVideoList, downloading, toggleSearching } from '../actions/action.js';

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
		// updateVideoList: (videos) => {
		// 	dispatch(updateVideoList(videos));
		// }
	};
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;