import { debug } from 'Yuemi/src/config';

const getInitialState = () => {
	return {
		feedList: [],
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

const feed = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'UPDATE_FEED':
		newState = copyState(state);
		newState.feedList = action.feedList;
		return newState;

	default:
		return state;

	}
};

export default feed;