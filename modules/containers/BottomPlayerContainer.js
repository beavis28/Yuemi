import { connect } from 'react-redux';

import BottomPlayer from '../components/BottomPlayer.js';
import { setPlaying, updateTime, updatePaused } from '../actions/action.js';

const mapStateToProps = (state) => {
	return {
		current: state.audio,
		seconds: state.audio.seconds,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPlaying: (obj) => {
			dispatch(setPlaying(obj));
		},
		updateTime: (seconds) => {
			dispatch(updateTime(seconds));
		},
		updatePaused: (value) => {
			dispatch(updatePaused(value));
		},
	};
};

const BottomPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(BottomPlayer);
export default BottomPlayerContainer;