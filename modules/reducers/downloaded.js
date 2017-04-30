const getInitialState = () => {
	return {
		downloaded: {},
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state, {
			downloaded: Object.assign({}, state.downloaded),
		})
	);
};

const downloaded = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'ADD_TO_DOWNLOADED': {
		newState = copyState(state);
		const id = action.obj.id;
		const title = action.obj.title;
		newState.downloaded[id] = {title};
		return newState;
	}

	case 'PURGE_DOWNLOADS': {
		return getInitialState();
	}

	default:
		return state;

	}
};

export default downloaded;