import React, { Component } from 'react';
import { View, Text, Button, TextInput, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { createUser } from 'Yuemi/src/lib/get';
import { setLoggedIn, addUser } from 'Yuemi/src/action';

class Login extends Component {

	constructor(){
		super();
		this.state = {
			text: '',
		};
	}

	handleLogin(){
		createUser(this.state.text)
			.then((res) => {
				if(!res.ok){
					Alert.alert('Username already in use.');
				} else {
					this.props.addUser(this.state.text);
					this.props.setLoggedIn();
				}
			});
	}

	render(){
		// back button now not functional. find fix.
		return(
			<Modal
				visible={true}
				animationType='slide'
				onRequestClose={() => console.log('closed')}
			>
				<View style={styles.loginContainer}>
					<View style={styles.fieldContainer}>
						<TextInput
							style={styles.usernameField}
							placeholder='Username'
							onChangeText={(text) => this.setState({text})}
							onSubmitEditing={() => this.handleLogin()}
							autoCorrect={false}
							autoCapitalize={'none'}
						/>
					</View>
					<View style={styles.loginButtonContainer}>
						<Button
							style={styles.loginButton}
							color={'#ff6666'}
							title={'Login'}
							onPress={() => this.handleLogin()}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLoggedIn: () => {
			dispatch(setLoggedIn());
		},
		addUser: (user) => {
			dispatch(addUser(user)); // string, username
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);