import { connect } from 'react-redux';
import {
	updateText,
	toggleSearching,
	updateVideoList,
	downloading,
	setPlaying
} from '../actions/action.js';

import MyMusic from '../components/MyMusic';

const mapStateToProps = (state) => {
	return {
		songs: state.downloaded.downloaded,
		playing: state.app.playing,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPlaying: (obj) => {
			dispatch(setPlaying(obj));
		},
	};
};

const MyMusicContainer = connect(mapStateToProps, mapDispatchToProps)(MyMusic);
export default MyMusicContainer;