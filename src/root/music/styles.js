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
		height: 65,
	},
	listTextPlaying: {
		fontSize: 15,
		color: '#000',
		fontWeight: 'bold',
		textAlign: 'left',
		marginLeft: 10,
	},
	songImage: {
		width: 50,
		height: 50,
	},
	listText: {
		fontSize: 15,
		textAlign: 'left',
		color: '#333',
		marginLeft: 10,
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
	},
	textContainer: {
		width: '65%',
	},
	moreContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '15%',
	},
	menu: {
		height: 75,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ff6666',
	},
	menuOption: {
		height: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default styles;
