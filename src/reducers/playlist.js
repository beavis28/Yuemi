import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		playlist: [],
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

const login = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'SET_PLAYLIST': {
		newState = copyState(state);
		newState.playlist = action.list;
		return newState;
	}

	default:
		return state;

	}
};

export default login;