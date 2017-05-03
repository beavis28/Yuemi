import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { AppRegistry, AsyncStorage, View } from 'react-native';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import app from './modules/reducers/app.js';
import downloaded from './modules/reducers/downloaded.js';
import search from './modules/reducers/search.js';
import audio from './modules/reducers/audio.js';
import login from './modules/reducers/login.js';
import feed from './modules/reducers/feed.js';
import user from './modules/reducers/user.js';

import RootContainer from './modules/containers/RootContainer';
import styles from './modules/styles/styles';

import { persistStore, autoRehydrate } from 'redux-persist';

console.disableYellowBox = true;


// NEED TO BLACKLIST & SPLIT NETWORKING REDUCERS


const logger = createLogger();
const useLogger = true;
let store;

const appReducer = combineReducers({
	login,
	app,
	downloaded,
	search,
	audio,
	feed,
	user
});

if(useLogger == true){
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

// persistStore(store, {storage: AsyncStorage, whitelist: ['downloaded']});
persistStore(store, {storage: AsyncStorage, whitelist: ['downloaded', 'user', 'login']});
// persistStore(store, {storage: AsyncStorage});

const App = () => (
	<Provider store={store}>
		<RootContainer/>
	</Provider>
);

AppRegistry.registerComponent('Yuemi', () => App);