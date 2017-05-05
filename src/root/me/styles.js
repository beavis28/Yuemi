import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	myMusicContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#f5f5f5',
	},
	listRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 75,
	},
	listTextPlaying: {
		fontSize: 18,
		width: 275,
		color: '#000',
		textAlign: 'left',
		paddingLeft: 40,
	},
	listText: {
		width: 275,
		fontSize: 18,
		textAlign: 'left',
		color: '#737373',
		paddingLeft: 40,
	},
});
export default styles;