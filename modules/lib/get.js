import RNFetchBlob from 'react-native-fetch-blob';

export function getDownload(id, title){
	let url = 'http://104.236.165.165/api/download/' + id;
	let musicDir = RNFetchBlob.fs.dirs.MusicDir + '/' + title + '.mp3';
	return RNFetchBlob
	.config({
		path: musicDir,
	})
    .fetch('GET', url)
		.then((res) => {
			console.log(res.path());
		});
}

export function getImage(id){


	let url = 'http://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
	let imageDir = RNFetchBlob.fs.dirs.PictureDir + '/' + id + '.jpg';
	return RNFetchBlob
	.config({
		path: imageDir,
	})
    .fetch('GET', url)
		.then((res) => {
			console.log(res.path());
		});
}

export function requestFile(id){
	return fetch('http://104.236.165.165/api/request_file/' + id)
		.then((res) => {
			console.log(res);
		});
}

export function getVideos(text){
	return fetch('http://104.236.165.165/api/search/' + text.split(' ').join('+'))
		.then((response) => response.json())
		.then((json) => json.videos);
}
