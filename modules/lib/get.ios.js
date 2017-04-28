import RNFetchBlob from 'react-native-fetch-blob';
var Sound = require('react-native-sound'); //change to import?

export function getDownload(id, title){
	console.log('GETTING DOWNLOAD');
	let url = 'http://104.236.165.165/api/download/' + id;
	let dirs = RNFetchBlob.fs.dirs;
	RNFetchBlob
	.config({
		path: dirs.DocumentDir + '/' + title + '.mp3',
	})
	.fetch('GET', url, {
	})
	.then((res) => {
		Sound.setCategory('Playback');
		var test = new Sound(title + '.mp3', dirs.DocumentDir, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			} else {
				test.play();
			}
		});
		console.log('The file saved to ', res.path());
	});
}

export function getVideos(){
	console.log('BUTTON PRESSED.');
	let self = this;
	fetch('http://104.236.165.165/api/search/' + self.state.text.split(' ').join('+'))
		.then(function(res){
			return res.json();
		})
		.then(function(json){
			self.setState({videos: json.videos});
		});
}
