import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
	mainHeaderContainer: {
		height: 60,
		backgroundColor: '#ff6666',
	},
	header: {
		height: '100%',
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: 10,
	},
	headerText: {
		color: '#fff',
		fontSize: 25,
	},
	searchBarContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBarSubcontainer: {
		width: '70%',
	},
	textInput: {
		height: 40,
		color: '#fff',
	},
	list: {
		width: '100%',
	},
});
export default styles;
