import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	player: {
		height: '100%',
	},
	rootContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
	textContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '80%',
	},
	sliderContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '80%',
	},
	imageContainer: {
		flex: 7,
		width: '100%',
	},
	playPauseImageContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
	},
	mainImage: {
		height: '100%',
		width: '100%',
	},
	playPauseImage: {
		height: 50,
		width: 50,
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
	},
	track: {
		height: 10,
		borderRadius: 4,
		backgroundColor: '#ff6666',
	},
	thumb: {
		top: 48,
		width: 20,
		height: 20,
		backgroundColor: '#e60000',
		borderColor: '#e60000',
		borderWidth: 5,
		borderRadius: 10,
	},
});
export default styles;