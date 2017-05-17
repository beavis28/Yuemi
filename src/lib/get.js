import RNFetchBlob from 'react-native-fetch-blob';

export function getDownload(id, title, user, duration){
	let url = 'http://104.236.165.165/api/download/' + id;
	let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + id + '.mp3';
	return RNFetchBlob
	.config({path})
    .fetch('GET', url)
		.then((res) => {
			fetch('http://104.236.165.165/api/downloads/', {
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

export function getImage(id){
	let url = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
	console.log(url);
	let path = RNFetchBlob.fs.dirs.DocumentDir + '/' + id + '.jpg';
	return RNFetchBlob
	.config({path})
    .fetch('GET', url)
		.then((res) => {
			console.log(res.path());
		});
}

export function requestFile(id){
	console.log('REQUESTED FILE');
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

export function getFeed(){
	return fetch('http://104.236.165.165/api/downloads')
		.then((response) => response.json())
		.then((json) => (json));
}

export function createUser(username){
	return fetch('http://104.236.165.165/api/user', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username
		})
	});
}
