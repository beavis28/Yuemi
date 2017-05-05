import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	activityIndicator: {
		marginTop: 50,
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
		height: 60,
	},
	listRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30,
	},
	listRowTextContainer: {
		width: '90%',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	listRowTextSubcontainer: { // i love flex
		flex: 6,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	downloadButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listRowText: {
		fontSize: 18,
		textAlign: 'left',
		color: '#737373',
	},
	disabledListRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	disabledListRowTextContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 25,
		paddingLeft: 25,
	},
	disabledListRowText: {
		color: '#555555',
		textAlign: 'center',
		fontSize: 18,
	},
	listRowContainer: {
		height: 100,
	},
});
export default styles;