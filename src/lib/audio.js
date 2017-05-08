import RNFetchBlob from 'react-native-fetch-blob';
import Sound from 'react-native-sound';
import _ from 'lodash';

class Audio {

	constructor(bundle){
		// state
		this.playlist = bundle.playlist;
		// actions
		this.soundObj = null;
		this.unsetPlaying = bundle.unsetPlaying;
		this.setPlaying = bundle.setPlaying;
		this.updateTime = bundle.updateTime;
		this.updatePaused = bundle.updatePaused;
		// init
		this.playNew();
	}

	playNew(){
		const id = this.playlist[0];
		this.playlist = _.slice(this.playlist, 1);
		if(this.soundObj != null){
			this.stopAndReleaseSoundObject();
		}
		let soundObj = new Sound('/' + id + '.mp3', RNFetchBlob.fs.dirs.DocumentDir, (error) => {
			if (error) {
				this.endMusic(this.unsetPlaying, soundObj);
			} else {
				let duration = soundObj.getDuration();
				const next = {id, soundObj, duration};
				this.setPlaying(next);
				this.soundObj = soundObj;
				this.playMusic();
			}
		});
	}

	playMusic(){
		this.soundObj.play(this.onMusicEnd());
		setTimeout(this.sustainTimeLog.bind(this), 1000);
		this.updatePaused(false);
	}

	onMusicEnd(){
		if(this.playlist.length > 0){
			return () => {
				this.playNew();
			};
		} else {
			return () => {
				this.endMusic();
			};
		}
	}

	sustainTimeLog(){
		this.getTime((seconds, isPlaying) => {
			if(isPlaying){
				this.updateTime(seconds);
				setTimeout(this.sustainTimeLog.bind(this), 1000);
			}
		});
	}

	stopAndReleaseSoundObject(){
		this.soundObj.stop();
		this.soundObj.release();
	}

	endMusic(){
		this.stopAndReleaseSoundObject();
		this.unsetPlaying();
	}

	getTime(onResolve){
		this.soundObj.getCurrentTime(onResolve);
	}

	setTime(value){
		this.soundObj.setCurrentTime(value);
	}

	pauseMusic(){
		this.soundObj.pause();
		this.updatePaused(true);
	}

	shuffle(arr){
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;	
	}

}

export default Audio;