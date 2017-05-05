import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	mainHeaderContainer: {
		backgroundColor: '#ff6666', // #ff6666
		height: 50,
	},
	mainHeader: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
	},
	leftContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	headerText: {
		paddingLeft: 20,
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 20,
	},
	list: {
		width: '100%',
	},
	textInput: {
		color: '#fff',
	},
});
export default styles;