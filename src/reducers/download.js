import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		activeDownload: null, // id
		downloadQueue: [], // list of { id, title, duration }
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

	case 'ADD_DOWNLOAD_TO_QUEUE': {
		newState = copyState(state);
		newState.downloadQueue.push(action.obj);
		return newState;
	}

	case 'SET_ACTIVE_DOWNLOAD': {
		newState = copyState(state);
		newState.activeDownload = action.id;
		return newState;
	}

	case 'SHIFT_DOWNLOAD_QUEUE': { // O(n), not great.
		newState = copyState(state);
		newState.downloadQueue.shift();
		return newState;
	}

	default:
		return state;

	}
};

export default download;