import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	rootNavContainer: {
		flex: 7,
	},
	player: {
		height: 85,
		backgroundColor: '#fafafa',
		borderTopColor: '#000',
		borderTopWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playerContainer: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	navIconContainer: {
		width: '10%',
		flexDirection: 'row',
		justifyContent: 'center',
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
	controlContent: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	track: {
		height: 10,
		borderRadius: 4,
		backgroundColor: '#ff6666',
	},
	thumb: {
		top: 27,
		width: 20,
		height: 20,
		backgroundColor: '#e60000',
		borderColor: '#e60000',
		borderWidth: 5,
		borderRadius: 10,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sliderContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '85%',
	},
	playerSubcontainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
});

export default styles;
