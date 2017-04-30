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




// TO PERSIST:
// WARNING, DOWNLOAD HAS POTENTIAL OF GETTING STUCK
// UPON RELOAD.
// import React from 'react';
// import { Provider } from 'react-redux';
// import { compose, createStore, applyMiddleware } from 'redux';
// import reducer from './modules/reducers/reducer.js';
// import { AppRegistry, AsyncStorage } from 'react-native';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import { persistStore, autoRehydrate } from 'redux-persist';
// console.disableYellowBox = true;

// import AppContainer from './modules/containers/AppContainer.js';

// const logger = createLogger();
// const useLogger = true;
// let store;

// if(useLogger == true){
// 	store = createStore(
// 	reducer,
// 	compose(
// 		applyMiddleware(thunk, logger),
// 		autoRehydrate()
// 	)
//   );
// } else {
// 	store = createStore(reducer);
// }

// persistStore(store, {storage: AsyncStorage});

// const App = () => (
//   <Provider store={store}>
// 	<AppContainer/>
//   </Provider>
// );

// AppRegistry.registerComponent('Yuemi', () => App);