import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	mainContainer: {
		height: 100,
	},
	activityIndicator: {
		marginTop: 50,
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
		flex: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	downloadButtonContainer: {
		flex: 2,
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
});
export default styles;