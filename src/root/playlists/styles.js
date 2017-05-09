import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#f5f5f5',
	},
	playlist: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 100,
	},
	subcontainer: {
		flexDirection: 'row',
	},
	icon: {
		paddingLeft: 30,
		fontSize: 30,
		color: '#000',
	},
	description: {
		paddingLeft: 30,
		textAlign: 'left',
		fontSize: 20,
		color: '#000',
	},
	create: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
	},
	createText: {
		paddingLeft: 30,
		textAlign: 'left',
		fontSize: 20,
		color: '#000',
	},
	modalView: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.1)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalSubview: {
		height: 200,
		width: 250,
		backgroundColor: '#f5f5f5',
		padding: 25,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	modalText: {
		color: '#000',
		fontSize: 18,
		fontWeight: 'bold',
	},
	textInput: {
		width: '100%',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	button: {
		color: '#ff6666',
		fontWeight: 'bold',
		fontSize: 17,
	},
	playlistsContainer: {
		height: '100%',
		backgroundColor: '#f5f5f5',
	},
	playlistContainer: {
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	playlistCard: {
		backgroundColor: '#f5f5f5',
		width: '70%',
		height: 200,
	},
	cardTop: {
		height: '80%',
		backgroundColor: '#aaa',
	},
	cardQuadrent: {
		position: 'absolute',
		height: '50%',
		width: '50%',
	},
	cardTR: {
		top: 0,
		right: 0,
	},
	cardTL: {
		top: 0,
		left: 0,
	},
	cardBR: {
		bottom: 0,
		right: 0,
	},
	cardBL: {
		bottom: 0,
		left: 0,
	},
	cardBottom: {
		height: '20%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardText: {
		fontSize: 18,
		color: '#000',
	},
	cardImage: {
		height: '100%',
		width: '100%',
	},
});
export default styles;


