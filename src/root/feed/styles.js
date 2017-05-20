import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// Feed
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ff6666', //f5f5f5
	},
	// Feed List
	list: {
		width: '100%',
	},
	// Feed Rows
	rowContainer: {
		height: 100,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	userText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	listRowText: {
		fontSize: 20,
		textAlign: 'center',
		color: '#fff',
	},
});
export default styles;
