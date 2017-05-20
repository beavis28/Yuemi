import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		downloaded: {}, // id: { title, duration }
	};
};

const copyState = (state) => {

	if(debug == true){
		return JSON.parse(JSON.stringify(state));
	}
	
	return JSON.parse(JSON.stringify(state)); // need to fix
};

const download = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'ADD_TO_DOWNLOADED': {
		newState = copyState(state);
		newState.downloaded[action.id] = action.obj;
		return newState;
	}

	case 'PURGE_DOWNLOADS': {
		return getInitialState();
	}

	case 'DELETE_SONG': {
		newState = copyState(state);
		delete newState.downloaded[action.id];
		console.log(newState);
		return newState;
	}

	default:
		return state;

	}
};

export default download;
