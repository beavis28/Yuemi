import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		loggedIn: false,
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

	case 'SET_LOGGED_IN': {
		newState = copyState(state);
		newState.loggedIn = true;
		return newState;
	}

	default:
		return state;

	}
};

export default login;