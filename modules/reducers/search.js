const getInitialState = () => {
	return {
		videoList: [], // list of displayed videos
		searchText: '',
		isSearching: false,
		searchBarActive: false,
	};
};

const copyState = (state) => {
	return (
		Object.assign({}, state)
	);
};

const search = (state=getInitialState(), action) => {
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

	case 'SET_SEARCH_BAR':
		newState = copyState(state);
		newState.searchBarActive = action.value;
		return newState;

	default:
		return state;

	}
};

export default search;