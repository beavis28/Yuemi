import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput, Image, Modal, TouchableWithoutFeedback } from 'react-native';

import {
	updateDownload
} from 'Yuemi/src/action';
import Row from './Row';
import styles from './styles';

class EditSong extends Component {

	constructor(props){
		super();
		this.state = {
			titleText: '',
			artistText: '',
		}
		this.id = props.id;
		this.download = props.downloaded[this.id];
		this.title = this.download.title;
		this.artist = this.download.artist;
	}

	componentDidMount(){
		const titleText = this.title;
		const artistText = this.artist;
		this.setState({ titleText, artistText });
	}

	handleTitleSubmission(){
		this.refs.artist.focus();
	}

	handleCancel(){
		this.props.closeModal();
	}

	handleSubmission(){
		const artistText = this.state.artistText;
		const titleText = this.state.titleText;
		console.log(titleText, artistText)
		if(titleText != '' && artistText != ''){
			this.props.updateDownload(this.id, { title: titleText, artist: artistText });
			this.props.closeModal();
		}	
	}

	render(){
		const dir = RNFetchBlob.fs.dirs.DocumentDir;
		const uri = 'file:///' + dir + '/' + this.id + '.jpg';
		return (
			<Modal
				transparent={true}
				visible={this.state.visible}
				animationType='fade'
				onRequestClose={() => this.handleCancel()}
			>
				<View style={styles.modalView}>
					<View style={styles.modalSubview}>
						<Text style={styles.modalHeaderText}>
							Edit Song
						</Text>
						<View style={styles.modalInputComponent}>
							<Text style={styles.modalText}>
								New Song Title
							</Text>
							<TextInput
								ref='title'
								textAlign='left'
								style={styles.textInput}
								value = {this.state.titleText}
								onChangeText = {(text) => this.setState({titleText: text})}
								width = '75%'
								onSubmitEditing={() => this.handleTitleSubmission()}
								placeholder={'New Song Title'}
								autoCorrect={false}
								autoFocus={true}
								autoCapitalize='words'
								placeholderTextColor={'#888'}
								underlineColorAndroid={'#ff6666'}
								selectTextOnFocus={true}
							/>
						</View>
						<View style={styles.modalInputComponent}>
							<Text style={styles.modalText}>
								New Artist Name
							</Text>
							<TextInput
								ref='artist'
								textAlign='left'
								style={styles.textInput}
								value = {this.state.artistText}
								onChangeText = {(text) => this.setState({artistText: text})}
								width = '75%'
								onSubmitEditing={() => this.handleSubmission()}
								placeholder={'New Artist Name'}
								autoCorrect={false}
								autoCapitalize='words'
								placeholderTextColor={'#888'}
								underlineColorAndroid={'#ff6666'}
								selectTextOnFocus={true}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableWithoutFeedback
								onPress={() => this.handleSubmission()}
							>
								<View>
									<Text style={styles.button}>UPDATE</Text>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => this.handleCancel()}
							>
								<View style={{paddingLeft: 20,}}>
									<Text style={styles.button}>CANCEL</Text>
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
		downloaded: state.downloaded.downloaded
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateDownload: (id, obj) => {
			dispatch(updateDownload(id, obj));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSong);
