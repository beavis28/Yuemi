import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Root extends Component {

	render(){
		return(
			<View>
				<Text>
					Root component.
				</Text>
				{this.props.children}
			</View>
		);
	}
}

export default Root;
