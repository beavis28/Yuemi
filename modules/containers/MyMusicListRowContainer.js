import { connect } from 'react-redux';
import MyMusicListRow from '../components/MyMusicListRow.js';
import { setPlaying, updateTime, updatePaused } from '../actions/action.js';

const mapStateToProps = (state, ownProps) => {
	return {
		song: ownProps.song,
		title: ownProps.song.title,
		id: ownProps.song.id,

		paused: state.audio.paused,
		playing: state.audio.playing,
		current: state.audio,
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

const MyMusicListRowContainer = connect(mapStateToProps, mapDispatchToProps)(MyMusicListRow);
export default MyMusicListRowContainer;