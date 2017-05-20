import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	View, Text, FlatList, ActivityIndicator,
	Platform, TouchableHighlight, TouchableNativeFeedback,
	TextInput, Modal, TouchableWithoutFeedback
} from 'react-native';

import styles from './styles';
import {
	addPlaylist
} from 'Yuemi/src/action';

class CreatePlaylist extends Component {

	constructor(){
		super();
		this.state = {
			text: '',
		};
	}

	handleSubmission(){
		this.props.setModal(false);
		if(!_.includes(_.keys(this.props.playlists), this.state.text)){
			this.props.addPlaylist(this.state.text);
			this.setState({text: ''});
		}
	}

	render(){
		return(
			<Modal
				transparent={true}
				visible={this.props.visible}
				animationType='fade'
				onRequestClose={() => this.props.setModal(false)}
			>
				<View
					style={styles.modalView}
				>
					<View
						style={styles.modalSubview}
						elevation={5}
					>
						<Text style={styles.modalText}>
							New Playlist
						</Text>
						<TextInput
							textAlign='left'
							style={styles.textInput}
							placeholderTextColor={'#888'}
							underlineColorAndroid={'#ff6666'}
							value = {this.state.text}
							onChangeText = {(text) => this.setState({text})}
							width = '100%'
							onSubmitEditing={() => this.handleSubmission()}
							placeholder={'Search for some music.'}
							selectionColor='#ff6666'
							autoFocus={true}
							autoCorrect={false}
							autoCapitalize='none'
						/>
						<View style={styles.buttonContainer}>
							<TouchableWithoutFeedback
								onPress={() => this.props.setModal(false)}
							>
								<View>
									<Text style={styles.button}>CANCEL</Text>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => this.handleSubmission()}
							>
								<View style={{paddingLeft: 10}}>
									<Text style={styles.button}>CREATE</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playlists: state.playlist.playlists,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPlaylist: (name) => {
			dispatch(addPlaylist(name));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
