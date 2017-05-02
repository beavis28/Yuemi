import RNFetchBlob from 'react-native-fetch-blob';
import Sound from 'react-native-sound';

export function stopAndReleaseSoundObject(soundObj){
	soundObj.stop();
	soundObj.release();
}

export function endMusic(setPlaying, soundObj){
	stopAndReleaseSoundObject(soundObj);
	setPlaying({
		soundObj: null,
		id: '',
		title: '',
		artist: '',
		duration: 0,
		seconds: 0,
		paused: false,
	});
	// redundant but have to pass less stuff
	// and this section is already complex enough.
}

export function handleMusic(current, id, title, setPlaying, updateTime){
	//instead of passing title consider just passing id and the id -> info(title) obj
	if(current.soundObj != null){
		stopAndReleaseSoundObject(current.soundObj);
	}
	if(id == ''){
		endMusic(setPlaying, current.soundObj);
	} else {
		let soundObj = new Sound('/' + title + '.mp3', RNFetchBlob.fs.dirs.MusicDir, (error) => {
			if (error) {
				endMusic(setPlaying, soundObj);
			} else {
				let duration = soundObj.getDuration();

				let next = {id, title, soundObj, duration};
				// SUBJECT TO CHANGE

				setPlaying(next);
				soundObj.play(() => {
					endMusic(setPlaying, soundObj);
				});
				setTimeout(() => sustainTimeLog(soundObj, updateTime), 1000);
			}
		});
	}
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

export function resumeMusic(soundObj, updatePaused, setPlaying, updateTime){
	soundObj.play(() => {
		endMusic(setPlaying, soundObj);
	});
	setTimeout(() => sustainTimeLog(soundObj, updateTime), 1000);
	updatePaused(false);
}

export function musicInterface(current, updatePaused, setPlaying, updateTime){
	//instead of passing title consider just passing id and the id -> info(title) obj
	if(current.paused){
		resumeMusic(current.soundObj, updatePaused, setPlaying, updateTime);
	} else {
		pauseMusic(current.soundObj, updatePaused);
	}
}
