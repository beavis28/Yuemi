import RNFetchBlob from 'react-native-fetch-blob';
import { serverLocation } from '../config.js';
import io from 'socket.io-client';

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
				return getDownload(id, title, duration);
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

export function getDownload(id, title, duration) {
	console.log('DOWNLOADING', id, title);
	let url = serverLocation + '/api/getfile/' + id;
	let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + id + '.mp3';
	return RNFetchBlob
		.config({ path })
		.fetch('GET', url)
		.then((res) => {
			fetch(serverLocation + '/api/downloads/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id,
					title,
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
	return new Promise((resolve, reject) => {
		const socket = io(serverLocation, { jsonp: false });
		socket.emit('request_file', id);
		socket.on('progress', (progress_string) => {
			console.log(progress_string);
			//this.props.setProgress(id, parseInt(progress_string));
		});
		socket.on('request_complete', () => {
			resolve(id); // still no error handling...
		});
	})
}

export function getVideos(text) {
	return fetch(serverLocation + '/api/search/' + text.split(' ').join('+'))
		.then((response) => response.json())
		.then((json) => json.videos)
		.catch((err) => {
			console.log('GET_VIDEOS_ERR:', err);
		});
}

export function getFeed() {
	return fetch(serverLocation + '/api/downloads')
		.then((response) => response.json())
		.then((json) => (json))
		.catch((err) => {
			console.log('GET_FEED_ERR', err);
		});
}