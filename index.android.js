import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducers/reducer.js';
import { AppRegistry } from 'react-native';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
console.disableYellowBox = true;

import AppContainer from './modules/containers/AppContainer.js';

const logger = createLogger();
const useLogger = true;
let store;

if(useLogger == true){
	store = createStore(
	reducer,
	applyMiddleware(thunk, logger)
  );
} else {
	store = createStore(reducer);
}

const App = () => (
  <Provider store={store}>
	<AppContainer/>
  </Provider>
);

AppRegistry.registerComponent('Yuemi', () => App);