import RNFetchBlob from 'react-native-fetch-blob';

export function getDownload(id, title){
	let url = 'http://104.236.165.165/api/download/' + id;
	console.log('URL: ', url);
	let musicDir = RNFetchBlob.fs.dirs.MusicDir + '/' + title + '.mp3';
	return RNFetchBlob
	.config({
		addAndroidDownloads: {
			useDownloadManager: true,
			mime: 'audio/mp3',
			description: '',
			title: title + '.mp3',
			path: musicDir,
		}
	})
    .fetch('GET', url)
		.then((res) => {
			console.log(res.path());
		});
}

export function getVideos(text){
	return fetch('http://104.236.165.165/api/search/' + text.split(' ').join('+'))
		.then((response) => response.json())
		.then((json) => json.videos);
}
