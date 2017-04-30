const getInitialState = () => {
	return {
		videoList: [], // list of displayed videos
		searchText: '',
		isSearching: false,
		activeDownload: {}, // one download object, id, title
		downloadQueue: [], // list of download objects
		downloaded: {}, // object of download objects (key is id)
		requested: '',
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state, {
			downloaded: Object.assign({}, state.downloaded)
		})
	);
};

const reducer = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'TOGGLE_SEARCHING':
		newState = copyState(state);
		newState.isSearching = action.value;
		return newState;

	case 'ADD_DOWNLOAD': {
		newState = copyState(state);
		newState.downloadQueue.push(action.obj);
		return newState;
	}

	case 'SET_ACTIVE_DOWNLOAD': {
		newState = copyState(state);
		newState.activeDownload = action.obj;
		return newState;
	}

	case 'SHIFT_DOWNLOAD_QUEUE': { // O(n), not great.
		newState = copyState(state);
		newState.downloadQueue.shift();
		return newState;
	}

	case 'UPDATE_TEXT':
		newState = copyState(state);
		newState.searchText = action.text;
		return newState;

	case 'UPDATE_VIDEO_LIST':
		newState = copyState(state);
		newState.videoList = action.videos;
		return newState;

	case 'ADD_TO_DOWNLOADED': {
		newState = copyState(state);
		const id = action.obj.id;
		const title = action.obj.title;
		newState.downloaded[id] = {title};
		return newState;
	}

	case 'ADD_REQUEST': {
		newState = copyState(state);
		newState.requested = action.id;
		return newState;
	}

	default:
		return state;

	}
};

export default reducer;