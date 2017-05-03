import { connect } from 'react-redux';
import {  } from '../actions/action.js';

import Playlists from '../components/Playlists.js';

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const PlaylistsContainer = connect(mapStateToProps, mapDispatchToProps)(Playlists);
export default PlaylistsContainer;