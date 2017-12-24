import RNFetchBlob from 'react-native-fetch-blob';
import { ip } from '../config.js';

// need to use classes
export function handleDownload(bundle, id, title, duration, getDownloadQueue, getActiveDownload) {
	console.log('handle download called');
	console.log(getDownloadQueue(), getActiveDownload);
	let dlq = getDownloadQueue();
	if (dlq.includes({ id, title, duration })) {
		return;
	}
	if (getActiveDownload() != null) {
		bundle.addDownloadToQueue({ id, title, duration });
	} else {
		bundle.setActiveDownload(id);
		requestFile(id)
			.then(() => {
				return getDownload(id, title, bundle.user, duration);
			})
			.then(() => {
				bundle.addToDownloaded(id, title, duration);
				bundle.setActiveDownload(null);
				getImage(id);
				console.log('DECIDING DECIDING DECIDING');
				if (getDownloadQueue().length > 0) {
					const next = getDownloadQueue()[0];
					bundle.shiftDownloadQueue();
					console.log('CALLING NEXT HANDLE DOWNLOAD');
					handleDownload(bundle, next.id, next.title, next.duration, getDownloadQueue, getActiveDownload);
				}
			})
			.catch((err) => {
				console.log(err);
				bundle.setActiveDownload(null);
			});
	}
}

export function getDownload(id, title, user, duration) {
	console.log('DOWNLOADINGNGNG', id, title);
	let url = ip + '/' + id;
	let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + id + '.mp3';
	return RNFetchBlob
		.config({ path })
		.fetch('GET', url)
		.then((res) => {
			fetch(ip + '/api/downloads/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id,
					title,
					user,
					duration
				})
			})
				.then((res) => {
					console.log(res);
				});
		});
}

export function getImage(id) {
	let url = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
	console.log(url);
	let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + id + '.jpg';
	return RNFetchBlob
		.config({ path })
		.fetch('GET', url)
		.then((res) => {
			console.log(res.path());
		});
}

export function requestFile(id) {
	console.log('REQUESTED FILE');
	return fetch(ip + '/api/request_file/' + id)
		.then((res) => {
			console.log(res);
		});
}

export function getVideos(text) {
	return fetch(ip + '/api/search/' + text.split(' ').join('+'))
		.then((response) => response.json())
		.then((json) => {
			console.log('VIDEOS::::::');
			console.log(json.videos);
			return json.videos
		})
		.catch((err) => {
			console.log('GET_VIDEOS_ERR:', err);
		});
}

export function getFeed() {
	return fetch(ip + '/api/downloads')
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			console.log('GET_FEED_ERR', err);
		});
}

export function createUser(username) {
	return fetch(ip + '/api/user', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username
		})
	})
		.catch((err) => {
			console.log('CREATE_USER_ERR:', err);
		});
}
