const getInitialState = () => {
	return {
      videos: [],
      searchText: "",
      searching: false,
      downloading: false,
	}
}

const copyState = (state) => {
	return (
		Object.assign({}, state)
	)
}

const reducer = (state=getInitialState(), action) => {
	let newState;
	switch(action.type){

		case "GET_SEARCH_RESULTS":
			let newState = copyState(state);
			newState.searching = true;
			return newState;

		default:
			return state;

	}
}

export default reducer;