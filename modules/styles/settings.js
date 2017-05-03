import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	subcontainer: {
		height: 100,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fafafa'
	},
	icon: {
		paddingLeft: 45,
		fontSize: 30,
		color: '#000',
	},
	text: {
		textAlign: 'left',
		paddingLeft: 40,
		fontSize: 20,
		color: '#000',
	},
});
export default styles;