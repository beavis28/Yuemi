import { debug } from 'Yuemi/src/config';
import _ from 'lodash';

const getInitialState = () => {
	return {
		playlist: [], // list of id
		playlists: {}, // { playListName: [id] }
	};
};

const copyState = (state) => {

	if(debug == true){
		return JSON.parse(JSON.stringify(state));
	}
	
	return JSON.parse(JSON.stringify(state));
};

const login = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'SET_PLAYLIST': {
		newState = copyState(state);
		newState.playlist = action.list;
		return newState;
	}

	case 'ADD_PLAYLIST': {
		newState = copyState(state);
		newState.playlists[action.name] = [];
		return newState;
	}

	case 'ADD_TO_PLAYLIST': {
		newState = copyState(state);
		if(!_.includes(newState.playlists[action.list], action.song)){
			newState.playlists[action.list].push(action.song);
		}
		return newState;
	}

	default:
		return state;

	}
};

export default login;