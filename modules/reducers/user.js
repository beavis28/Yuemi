const getInitialState = () => {
	return {
		username: '',
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state)
	);
};

const user = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'ADD_USER':
		newState = copyState(state);
		newState.username = action.user;
		return newState;

	default:
		return state;

	}
};

export default user;