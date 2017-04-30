import RNFetchBlob from 'react-native-fetch-blob';
import Sound from 'react-native-sound';

export function stopAndReleaseSoundObject(soundObj){
	soundObj.stop();
	soundObj.release();
}

export function endMusic(setPlaying, soundObj){
	stopAndReleaseSoundObject(soundObj);
	setPlaying({title: '', soundObj: null});
}

export function handleMusic(playing, title, setPlaying){

	console.log('playing:', playing);
	console.log('title:', title);
	console.log('setPlaying:', setPlaying);

	if(playing.soundObj != null){
		stopAndReleaseSoundObject(playing.soundObj);
	}
	if(title == ''){
		endMusic(setPlaying, playing.soundObj);
	} else {
		let soundObj = new Sound('/' + title + '.mp3', RNFetchBlob.fs.dirs.MusicDir, (error) => {
			if (error) {
				endMusic(setPlaying, soundObj);
			} else {
				setPlaying({title, soundObj});
				soundObj.play(endMusic, setPlaying, soundObj);
			}
		});
	}
}
