import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage, Text } from 'react-native';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './modules/reducers/reducer.js';
import downloaded from './modules/reducers/downloaded.js';
import search from './modules/reducers/search.js';
import audio from './modules/reducers/audio.js';

import { addNavigationHelpers } from 'react-navigation';
import { Tabs } from './modules/routes/router';

import { persistStore, autoRehydrate } from 'redux-persist';

console.disableYellowBox = true;


// NEED TO BLACKLIST & SPLIT NETWORKING REDUCERS


const logger = createLogger();
const useLogger = false;
let store;

const AppNavigator = Tabs;
const initialState = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Search')
);

const navReducer = (state = initialState, action) => {
	const nextState = AppNavigator.router.getStateForAction(action, state);
	return nextState || state;
};

const appReducer = combineReducers({
	nav: navReducer,
	app: reducer,
	downloaded,
	search,
	audio
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

persistStore(store, {storage: AsyncStorage, whitelist: ['downloaded', '']});

const App = () => (
	<Provider store={store}>
		<AppNavigator/>
	</Provider>
);

AppRegistry.registerComponent('Yuemi', () => App);