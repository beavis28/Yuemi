import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		audio: null,
		id: '',
		duration: 0,
		seconds: 0,
		paused: false,
	};
};

const copyState = (state) => {

	if(debug == true){
		return JSON.parse(JSON.stringify(state));
	}
	
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
		newState.id = action.obj.id;
		newState.duration = action.obj.duration;
		newState.seconds = 0;
		newState.paused = false;
		return newState;
	}

	case 'UNSET_PLAYING': {
		return getInitialState();
	}

	case 'SET_AUDIO': {
		newState = copyState(state);
		newState.audio = action.obj;
		return newState;
	}

	default:
		return state;

	}
};

export default audio;
