import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'Yuemi/src/store';
import Root from 'Yuemi/src/root/Root';

console.disableYellowBox = true;

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