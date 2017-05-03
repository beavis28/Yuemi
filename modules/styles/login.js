import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fieldContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	usernameField: {
		width: 350,
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