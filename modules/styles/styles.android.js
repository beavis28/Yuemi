import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	listRow: {
		height: 100,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	listText: {
		fontSize: 18,
		paddingRight: 20,
		width: 275,
	},
	listSeparator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#8E8E8E',
	},
	listButton: {
		alignSelf: 'flex-end',
	},
	listContainer: {
		padding: 12,
	},
	mainButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 150,
	},
	container: {
		padding: 12,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	activityIndicator: {
		marginTop: 50,
	},
});

export default styles;