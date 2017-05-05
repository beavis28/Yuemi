import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		downloaded: {}, // object of { id, title, duration }
	};
};

const copyState = (state) => {

	if(debug == true){
		return JSON.parse(JSON.stringify(state));
	}
	
	return JSON.parse(JSON.stringify(state));
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

	default:
		return state;

	}
};

export default download;