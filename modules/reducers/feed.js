const getInitialState = () => {
	return {
		feedList: [],
	};
};

const copyState = (state) => {
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