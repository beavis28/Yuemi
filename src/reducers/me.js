import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		activeMenuId: '',
	};
};

const copyState = (state) => {

	if(debug == true){
		return JSON.parse(JSON.stringify(state));
	}
	
	return Object.assign({}, state);
};

const me = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'SET_ACTIVE_MENU': {
		newState = copyState(state);
		newState.activeMenuId = action.id;
		return newState;
	}

	default:
		return state;

	}
};

export default me;