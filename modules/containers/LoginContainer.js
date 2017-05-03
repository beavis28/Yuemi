import { connect } from 'react-redux';
import Login from '../components/Login';
import { setLoggedIn, addUser } from '../actions/action';

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLoggedIn: () => {
			dispatch(setLoggedIn());
		},
		addUser: (user) => {
			dispatch(addUser(user)); // string, username
		}
	};
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;