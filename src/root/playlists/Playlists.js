import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

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
				backgroundColor: '#f5f5f5',
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

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
