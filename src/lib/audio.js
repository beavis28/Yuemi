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
		this.getData = bundle.getData;
		this.shuffledList = this.shuffle(this.playlist); // shuffling isn't perfect
										// should generate a new shuffle every time
		// init
		this.index = bundle.index;
		this.shuffledIndex = 0;
		this.playNew();
	}

	playNew(){
		let id;
		if(this.getData().shuffle){
			id = this.shuffledList[this.shuffledIndex];
			this.shuffledIndex++;
			this.index = _.indexOf(this.playlist, id) + 1;
		} else {
			id = this.playlist[this.index];
			this.index++;
		}
		if(this.soundObj != null){
			this.stopAndReleaseSoundObject();
		}
		let soundObj = new Sound('/' + id + '.mp3', RNFetchBlob.fs.dirs.DocumentDir, (error) => {
			if (error) {
				this.unsetPlaying();
			} else {
				let duration = soundObj.getDuration();
				const next = {id, duration};
				this.setPlaying(next);
				this.soundObj = soundObj;
				this.playMusic();
			}
		});
	}

	playMusic(){
		this.soundObj.play(this.onMusicEnd());
		setTimeout(this.sustainTimeLog.bind(this, this.soundObj), 1000);
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

	sustainTimeLog(soundObj){
		this.getTime((seconds, isPlaying) => {
			if(isPlaying && this.soundObj === soundObj){
				this.updateTime(seconds);
				setTimeout(this.sustainTimeLog.bind(this, soundObj), 1000);
			}
		});
	}

	stopAndReleaseSoundObject(){
		this.soundObj.stop();
		this.soundObj.release();
	}

	skipNext(){
		this.playNew();
	}

	skipPrev(){
		if(this.getData().shuffle){
			if(this.shuffledIndex > 1){
				this.shuffledIndex -= 2;
			} else {
				this.shuffledIndex--;
			}
			this.index = _.indexOf(this.playlist, this.shuffledList[this.shuffledIndex]) + 1;
		} else {
			if(this.index > 1){
				this.index -= 2;
			} else {
				this.index--;
			}
		}
		this.playNew();
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
		let out = arr.slice();
		for (let i = out.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = out[i];
			out[i] = out[j];
			out[j] = temp;
		}
		return out;	
	}

	static parseSeconds(seconds) {
		seconds = Number(seconds);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);
		return `00${m}`.slice(-2) + ':' + `00${s}`.slice(-2);
	}

}

export default Audio;
