import React from 'react';
import {
	TabNavigator,
	DrawerNavigator,
	StackNavigator,
	TabBarTop
} from 'react-navigation';

import Me from 'Yuemi/src/root/me/Me';
import Feed from 'Yuemi/src/root/feed/Feed';
import Playlists from 'Yuemi/src/root/playlists/Playlists';
import Header from 'Yuemi/src/root/header/Header';
import Search from 'Yuemi/src/root/search/Search';
import Settings from 'Yuemi/src/root/settings/Settings';

export const Tabs = TabNavigator({
	MyMusic: {
		screen: Me,
		navigationOptions: {
			tabBarLabel: 'ME',
		},
	},
	Feed: {
		screen: Feed,
		navigationOptions: {
			tabBarLabel: 'FEED',
		},
	},
	Playlists: {
		screen: Playlists,
		navigationOptions: {
			tabBarLabel: 'PLAYLISTS',
		},
	},
}, {
	tabBarComponent: TabBarTop,
	tabBarPosition: 'top',
	tabBarOptions: {
		activeTintColor: '#fff',
		inactiveTintColor: '#fff',
		style: {
			backgroundColor: '#fff', // #ff6666
			height: 40,
		},
		labelStyle: {
			fontSize: 15,
			fontWeight: 'bold',
			marginTop: 1,
			color: '#ff6666', // normally gone
		},
		indicatorStyle: {
			backgroundColor: '#ff6666',
		},
	},
});

export const RootNav = StackNavigator({
	Tabs: {
		screen: Tabs,
		navigationOptions: {
			header: ({ navigation }) => <Header navigation={navigation}/>,
		},
	},
	Search: {
		screen: Search,
		navigationOptions: {
			title: 'YUEMI SEARCH',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
			},
		},
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			title: 'SETTINGS',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
			},
		},
	},
});
