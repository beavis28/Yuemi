import React, { Component } from "react";
import { connect } from "react-redux";
import { exampleAction } from "../actions/action.js";
import { View, Text } from "react-native";

import App from "../components/App.js";

const mapStateToProps = (state) => {
	return {
		state,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		exampleDispatch: () => {
			dispatch(exampleAction())
		},
	};
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;