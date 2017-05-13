import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'Yuemi/src/store';
import Root from 'Yuemi/src/root/Root';

console.disableYellowBox = true;


import RNFetchBlob from 'react-native-fetch-blob';
const dir = RNFetchBlob.fs.dirs.DocumentDir;
RNFetchBlob.fs.ls(dir)
.then((files) => console.log(files));

class App extends Component {

	render(){
		return (
			<Provider store={store}>
				<Root/>
			</Provider>
		);
	}

}

export default App;
