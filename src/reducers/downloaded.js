import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		downloaded: {}, // id: { title, duration, artist }
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

		let d = action.title.split(' - ');
		let duration = action.duration;
		let artist;
		let title;

		if(d.length == 2){
			artist = d[0].trim();
			title = d[1].trim();
		} else {
			title = action.title.trim();
			artist = "Unknown Artist";
		}

		newState.downloaded[action.id] = {title, duration, artist};
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

	case 'UPDATE_DOWNLOAD': {
		newState = copyState(state);
		newState.downloaded[action.id].title = action.title;
		newState.downloaded[action.id].artist = action.artist;
		return newState;
	}

	default:
		return state;

	}
};

export default download;
