import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	player: {
		flex: 1,
		backgroundColor: '#fafafa',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: '#aaa',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playerTop: {
		height: '10%',
		width: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: '#fafafa',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	playerBottom: {
		height: '10%',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fafafa',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iconContainer: {
		width: '50%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	playerFull: {
		flex: 1,
	},
	playerFullImage: {
		width: '100%',
		height: '100%',
	},
	slider: {
		width: '110%',
		alignSelf: 'center',
		position: 'absolute',
		top: '88.7%',
	},
	bottomPlayerContainer: {
		width: '100%',
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
	seconds: {
		fontSize: 15,
	},
	secondsContainer: {
		width: '25%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default styles;
