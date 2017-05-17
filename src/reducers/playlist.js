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

	case 'PURGE_PLAYLISTS': {
		newState = copyState(state);
		newState.playlists = {};
		return newState;
	}

	case 'DELETE_SONG': {
		newState = copyState(state);
		let keys = _.keys(newState.playlists);
		let cur;
		_.each(keys, (key) => {
			cur = newState.playlists[key];
			_.remove(cur, (id) => {
				console.log(action.id, id, action.id == id);
				return action.id == id;
			})
		});
		return newState;
	}

	case 'DELETE_PLAYLIST': {
		newState = copyState(state);
		delete newState.playlists[action.name];
		return newState;
	}

	default:
		return state;

	}
};

export default login;
