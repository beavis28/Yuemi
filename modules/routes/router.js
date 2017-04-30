import React from 'react';
import {
	TabNavigator,
	DrawerNavigator,
	StackNavigator
} from 'react-navigation';

import SearchContainer from '../containers/SearchContainer';
import MyMusicContainer from '../containers/MyMusicContainer';
import SettingsContainer from '../containers/SettingsContainer';
import BottomPlayerContainer from '../containers/BottomPlayerContainer';

export const Tabs = TabNavigator({
	Settings: {
		screen: SettingsContainer,
		navigationOptions: {
			tabBarLabel: 'SETTINGS',
		},
	},
	Search: {
		screen: SearchContainer,
		navigationOptions: {
			tabBarLabel: 'SEARCH',
		},
	},
	MyMusic: {
		screen: MyMusicContainer,
		navigationOptions: {
			tabBarLabel: 'MY MUSIC',
		},
	},
}, {
	tabBarOptions: {
		activeTintColor: '#fff',
		inactiveTintColor: '#fff', //e60000
		style: {
			backgroundColor: '#ff6666',
		},
		labelStyle: {
			fontSize: 15,
		},
		indicatorStyle: {
			backgroundColor: '#ff6666',
		},
	},
});

