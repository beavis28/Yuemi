const getInitialState = () => {
	return {
		soundObj: null,
		id: '',

		title: '',
		artist: '',

		duration: 0,
		seconds: 0,

		paused: false,
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state)
	);
};

const audio = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'UPDATE_TIME': {
		newState = copyState(state);
		newState.seconds = action.seconds;
		return newState;
	}

	case 'UPDATE_PAUSED': {
		newState = copyState(state);
		newState.paused = action.value;
		return newState;
	}

	case 'SET_PLAYING': {
		newState = copyState(state);
		newState.soundObj = action.obj.soundObj;
		newState.id = action.obj.id;
		newState.title = action.obj.title;
		//newState.artist = action.obj.artist;
		newState.duration = action.obj.duration;
		newState.seconds = action.obj.seconds;
		newState.paused = action.obj.paused;
		return newState;
	}

	default:
		return state;

	}
};

export default audio;