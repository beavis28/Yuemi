const getInitialState = () => {
	return {
		activeDownload: {}, // one download object, id, title
		downloadQueue: [], // list of download objects
		requested: '',
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state, {
			downloaded: Object.assign({}, state.downloaded),
		})
	);
};

const app = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

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

	case 'ADD_TO_DOWNLOADED': {
		newState = copyState(state);
		const id = action.obj.id;
		const title = action.obj.title;
		newState.downloaded[id] = {title};
		console.log(JSON.stringify(newState.downloaded));
		return newState;
	}

	case 'ADD_REQUEST': {
		newState = copyState(state);
		newState.requested = action.id;
		return newState;
	}

	case 'RESTORE_DEFAULT_SETTINGS': {
		newState = getInitialState();
		newState.downloaded = Object.assign({}, state.downloaded);
		return newState;
	}

	default:
		return state;

	}
};

export default app;