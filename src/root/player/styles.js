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
	
	// FULL PLAYER STYLES
	playerFull: {
		flex: 1,
	},
	chevronContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		flex: 6,
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fafafa',
		alignSelf: 'center',

		// IOS
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 10,
			width: 10,
		},
		shadowRadius: 20,
	},
	textContainer: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sliderContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	controlsContainer: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: {
		width: '50%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	playerFullImage: {
		width: '100%',
		height: '100%',
	},
	slider: {
		width: '90%',
	},
});

export default styles;
