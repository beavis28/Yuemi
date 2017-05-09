import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import {
	combineReducers, createStore,
	applyMiddleware, compose
} from 'redux';

import download from 'Yuemi/src/reducers/download';
import downloaded from 'Yuemi/src/reducers/downloaded';
import search from 'Yuemi/src/reducers/search';
import audio from 'Yuemi/src/reducers/audio';
import login from 'Yuemi/src/reducers/login';
import feed from 'Yuemi/src/reducers/feed';
import user from 'Yuemi/src/reducers/user';
import playlist from 'Yuemi/src/reducers/playlist';
import me from 'Yuemi/src/reducers/me';

import RootContainer from 'Yuemi/src/root/Root';
import { useLogger, reducerOnly } from 'Yuemi/src/config';

const logger = createLogger();

const appReducer = combineReducers({
	login, download, downloaded,
	search, audio, feed, user,
	playlist, me
});

let store;
if(reducerOnly == true){
	store = createStore(appReducer);
} else if(useLogger == true){
	store = createStore(
	appReducer,
	compose(
		applyMiddleware(thunk, logger),
		autoRehydrate()
	)
  );
} else {
	store = createStore(
	appReducer,
	compose(
		autoRehydrate()
	)
  );
}

persistStore(store, {storage: AsyncStorage, whitelist: ['downloaded', 'user', 'login', 'playlist']})
// .purge()
;

export default store;