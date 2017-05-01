import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	mainContainer: {
		height: 100,
	},
	activityIndicator: {
		marginTop: 50,
	},
	listRow: {
		width: 375,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	listRowTextContainer: {
		width: 262,
		flexDirection: 'column',
		justifyContent: 'space-between',
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
		width: 262,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	disabledListRowText: {
		color: '#555555',
		textAlign: 'center',
		fontSize: 18,
	},
});
export default styles;