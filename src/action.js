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

export const updateSearchList = (videos) => {
	return {
		type: 'UPDATE_VIDEO_LIST',
		videos
	};
};

export const addDownloadToQueue = (obj) => {
	return {
		type: 'ADD_DOWNLOAD_TO_QUEUE',
		obj
	};
};

export const setActiveDownload = (id) => {
	return {
		type: 'SET_ACTIVE_DOWNLOAD',
		id
	};
};

export const shiftDownloadQueue = () => {
	return {
		type: 'SHIFT_DOWNLOAD_QUEUE',
	};
};

export const addToDownloaded = (id, obj) => {
	return {
		type: 'ADD_TO_DOWNLOADED',
		id,
		obj
	};
};

export const setRequest = (id) => {
	return {
		type: 'SET_REQUEST',
		id,
	};
};

export const setPlaying = (obj) => {
	return {
		type: 'SET_PLAYING',
		obj,
	};
};

export const restoreDefaultSettings = () => {
	return {
		type: 'RESTORE_DEFAULT_SETTINGS',
	};
};

export const purgeDownloads = () => {
	return {
		type: 'PURGE_DOWNLOADS',
	};
};

export const updateTime = (seconds) => {
	return {
		type: 'UPDATE_TIME',
		seconds
	};
};

export const updatePaused = (value) => {
	return {
		type: 'UPDATE_PAUSED',
		value
	};
};

export const setLoggedIn = () => {
	return {
		type: 'SET_LOGGED_IN',
	};
};

export const setSearchBar = (value) => {
	return {
		type: 'SET_SEARCH_BAR',
		value
	};
};

export const updateFeed = (feedList) => {
	return {
		type: 'UPDATE_FEED',
		feedList
	};
};

export const addUser = (user) => {
	return {
		type: 'ADD_USER',
		user
	};
};

export const addDownloadInfo = (id, obj) => {
	return {
		type: 'ADD_DOWNLOAD_INFO',
		id,
		obj
	};
};

export const unsetPlaying = () => {
	return {
		type: 'UNSET_PLAYING'
	};
};

export const setPlaylist = (list) => {
	return {
		type: 'SET_PLAYLIST',
		list
	};
};

export const setAudio = (obj) => {
	return {
		type: 'SET_AUDIO',
		obj
	};
};

export const deleteSong = (id) => {
	return {
		type: 'DELETE_SONG',
		id
	};
};

export const setActiveMenu = (id) => {
	return {
		type: 'SET_ACTIVE_MENU',
		id
	};
};

export const addPlaylist = (name) => {
	return {
		type: 'ADD_PLAYLIST',
		name
	};
};

export const addToPlaylist = (list, song) => {
	return {
		type: 'ADD_TO_PLAYLIST',
		list,
		song
	};
};