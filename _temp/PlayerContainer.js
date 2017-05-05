// import { connect } from 'react-redux';

// import Player from '../components/Player.js';
// import { setPlaying, updateTime, updatePaused } from '../actions/action.js';

// const mapStateToProps = (state) => {
// 	return {
// 		current: state.audio,
// 		seconds: state.audio.seconds,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setPlaying: (obj) => {
// 			dispatch(setPlaying(obj));
// 		},
// 		updateTime: (seconds) => {
// 			dispatch(updateTime(seconds));
// 		},
// 		updatePaused: (value) => {
// 			dispatch(updatePaused(value));
// 		},
// 	};
// };

// const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);
// export default PlayerContainer;