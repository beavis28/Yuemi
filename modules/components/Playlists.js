import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Playlists extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<Text style={{
					fontSize: 25,
					color: '#555',
				}}>
					Playlists coming soon.
				</Text>
			</View>
		);
	}
}

export default Playlists;
