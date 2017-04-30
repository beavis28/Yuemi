import { connect } from 'react-redux';
import MyMusicListRow from '../components/MyMusicListRow.js';
import { setPlaying } from '../actions/action.js';

const mapStateToProps = (state, ownProps) => {
	return {
		song: ownProps.song,
		title: ownProps.song.title,
		id: ownProps.song.id,

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

const MyMusicListRowContainer = connect(mapStateToProps, mapDispatchToProps)(MyMusicListRow);
export default MyMusicListRowContainer;