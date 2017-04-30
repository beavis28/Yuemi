const getInitialState = () => {
	return {
		videoList: [], // list of displayed videos
		searchText: '',
		isSearching: false,
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state)
	);
};

const downloaded = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

	case 'TOGGLE_SEARCHING':
		newState = copyState(state);
		newState.isSearching = action.value;
		return newState;

	case 'UPDATE_TEXT':
		newState = copyState(state);
		newState.searchText = action.text;
		return newState;

	case 'UPDATE_VIDEO_LIST':
		newState = copyState(state);
		newState.videoList = action.videos;
		return newState;

	default:
		return state;

	}
};

export default downloaded;