import { connect } from 'react-redux';
import {
	updateText,
	toggleSearching,
	updateSearchList,
	downloading,
} from '../actions/action.js';

import MyMusic from '../components/MyMusic';

const mapStateToProps = (state) => {
	return {
		songs: state.downloaded.downloaded,

		playing: state.audio.playing,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const MyMusicContainer = connect(mapStateToProps, mapDispatchToProps)(MyMusic);
export default MyMusicContainer;