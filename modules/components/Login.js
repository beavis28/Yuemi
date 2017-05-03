import React, { Component } from 'react';
import { View, Text, Button, TextInput, Modal, Alert } from 'react-native';
import styles from '../styles/login';
import { createUser } from '../lib/get';

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

export default Login;

						// <TextInput
						// 	ref='passwordField'
						// 	style={styles.passwordField}
						// 	placeholder='Password'
						// 	onSubmitEditing={() => this.handleLogin()}
						// />
