export const toggleSearching = (value) => {
	return {
		type: 'TOGGLE_SEARCHING',
		value
	};
};

export const updateText = (text) => {
	return {
		type: 'UPDATE_TEXT',
		text
	};
};

export const updateVideoList = (videos) => {
	return {
		type: 'UPDATE_VIDEO_LIST',
		videos
	};
};

export const addDownload = (obj) => {
	return {
		type: 'ADD_DOWNLOAD',
		obj
	};
};

export const setActiveDownload = (obj) => {
	return {
		type: 'SET_ACTIVE_DOWNLOAD',
		obj
	};
};

export const shiftDownloadQueue = () => {
	return {
		type: 'SHIFT_DOWNLOAD_QUEUE',
	};
};

export const addToDownloaded = (obj) => {
	return {
		type: 'ADD_TO_DOWNLOADED',
		obj
	};
};

export const addRequest = (id) => {
	return {
		type: 'ADD_REQUEST',
		id,
	};
};
