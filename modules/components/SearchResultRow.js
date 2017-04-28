import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class SearchResultRow extends Component {
	render(){
		let styles = this.props.styles;
		let data = this.props.data;
		let getDownload = this.props.getDownload;
		return (
			<View style={styles.listRow}>
				<Text style={styles.listText}>
				  {data.title + '\n' + data.duration}
				</Text>
				<Button
				  style={styles.listButton}
				  onPress={() => getDownload(data.id, data.title)}
				  title="DOWNLOAD"
				  color="#1990B8"
				/>
			</View>
		)
	}
}

export default SearchResultRow;