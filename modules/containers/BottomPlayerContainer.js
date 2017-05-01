import { connect } from 'react-redux';

import BottomPlayer from '../components/BottomPlayer.js';

const mapStateToProps = (state) => {
	return {
		current: state.audio,
		seconds: state.audio.seconds,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const BottomPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(BottomPlayer);
export default BottomPlayerContainer;