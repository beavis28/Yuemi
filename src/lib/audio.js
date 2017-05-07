import RNFetchBlob from 'react-native-fetch-blob';
import Sound from 'react-native-sound';
import _ from 'lodash';

export function musicInterface(current, updatePaused, setPlaying, unsetPlaying, updateTime, id, paused, playlist){
	if(current.id != ''){
		if(current.id == id){
			if(paused){
				resumeMusic(current.soundObj, updatePaused, unsetPlaying, updateTime);
			} else {
				pauseMusic(current.soundObj, updatePaused);
			}
		} else {
			playNew(current, id, setPlaying, unsetPlaying, updateTime, playlist);
		}
	} else {
		playNew(current, id, setPlaying, unsetPlaying, updateTime, playlist);
	}
}

export function stopAndReleaseSoundObject(soundObj){
	soundObj.stop();
	soundObj.release();
}

export function endMusic(unsetPlaying, soundObj){
	stopAndReleaseSoundObject(soundObj);
	unsetPlaying();
}

export function playNew(current, id, setPlaying, unsetPlaying, updateTime, playlist){
	if(current.soundObj != null){
		stopAndReleaseSoundObject(current.soundObj);
	}
	let soundObj = new Sound('/' + id + '.mp3', RNFetchBlob.fs.dirs.DocumentDir, (error) => {
		if (error) {
			endMusic(unsetPlaying, soundObj);
		} else {
			let duration = soundObj.getDuration();
			let next = {id, soundObj, duration};
			setPlaying(next);
			let callback;
			if(playlist.length > 1){
				callback = () => {
					endMusic(unsetPlaying, soundObj);
					playNew(current, playlist[1], setPlaying, unsetPlaying, updateTime, _.slice(playlist, 1));
				};
			} else {
				callback = () => {
					endMusic(unsetPlaying, soundObj);
				};
			}
			soundObj.play(callback);
			setTimeout(() => sustainTimeLog(soundObj, updateTime), 1000);
		}
	});
}

export function sustainTimeLog(soundObj, updateTime){
	getTime(soundObj, updateTime, (seconds, isPlaying) => {
		if(isPlaying){
			updateTime(seconds);
			setTimeout(() => sustainTimeLog(soundObj, updateTime), 1000);
		}
	});
}

export function getTime(soundObj, updateTime, callback){
	soundObj.getCurrentTime(callback);
}

export function setTime(soundObj, value){
	soundObj.setCurrentTime(value);
}

export function pauseMusic(soundObj, updatePaused){
	soundObj.pause();
	updatePaused(true);
}

export function resumeMusic(soundObj, updatePaused, unsetPlaying, updateTime){
	soundObj.play(() => {
		endMusic(unsetPlaying, soundObj);
	});
	setTimeout(() => sustainTimeLog(soundObj, updateTime), 1000);
	updatePaused(false);
}

export function shuffle(arr){
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;	
}