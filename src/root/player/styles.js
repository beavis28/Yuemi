import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	rootNavContainer: {
		flex: 7,
	},
	player: {
		height: 85,
		width: '100%',
		backgroundColor: '#fafafa',
		elevation: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playerContainer: {
		height: '100%',
		width: '100%',
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
	},
	listContainer: {
		padding: 12,
	},
	mainButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 150,
	},
	playerDefaultImage: {
		width: 50,
		height: 50,
		marginLeft: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	playerImage: {
		width: 50,
		height: 50,
		marginLeft: 15,
	},
});

export default styles;
