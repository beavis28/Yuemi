import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	fieldContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	usernameField: {
		width: 350,
		height: 60,
	},
	passwordField: {
		width: 350,
	},
	loginButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 25,
	},
});
export default styles;