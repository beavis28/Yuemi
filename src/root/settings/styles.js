import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#f5f5f5',
	},
	setting: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 120,
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
});
export default styles;