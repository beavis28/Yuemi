import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	rootNavContainer: {
		flex: 7,
	},
	bottomPlayer: {
		flex: 1,
		backgroundColor: '#fafafa',
		elevation: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomPlayerContainer: {
		width: '80%',
		height: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	playingTextContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 25,
	},
	playingText: {
		width: '75%',
		fontSize: 20,
		textAlign: 'left',
	},
	playPauseIcon: {
		width: 30,
		height: 30,
		marginRight: 55,
	},
	listContainer: {
		padding: 12,
	},
	mainButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 150,
	},
});

export default styles;