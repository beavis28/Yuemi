import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// Feed
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
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
		paddingLeft: 25,
		paddingRight: 25,
	},
	userText: {
		fontSize: 15,
		color: '#555555',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	listRowText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#737373',
	},
});
export default styles;
