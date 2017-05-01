import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	bottomPlayer: {
		flex: 2,
		backgroundColor: '#fdfdfd',
		elevation: 5, // Not working.
		borderColor: '#000', // Temporary
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sliderContainer: {
		flex: 1,
	},
	playingTextContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2,
	},
	track: {
		height: 10,
		borderRadius: 4,
		backgroundColor: '#ff6666',
	},
	thumb: {
		top: 24,
		width: 20,
		height: 20,
		backgroundColor: '#e60000',
		borderColor: '#e60000',
		borderWidth: 5,
		borderRadius: 10,
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