import React from 'react';
import {
	TabNavigator,
	DrawerNavigator,
	StackNavigator
} from 'react-navigation';

import SearchContainer from '../containers/SearchContainer';
import MyMusicContainer from '../containers/MyMusicContainer';
import FeedContainer from '../containers/FeedContainer';
import SettingsContainer from '../containers/SettingsContainer';
import BottomPlayerContainer from '../containers/BottomPlayerContainer';
import PlayerContainer from '../containers/PlayerContainer';
import LoginContainer from '../containers/LoginContainer';
import MainHeaderContainer from '../containers/MainHeaderContainer';
import PlaylistsContainer from '../containers/PlaylistsContainer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

export const Tabs = TabNavigator({
	MyMusic: {
		screen: MyMusicContainer,
		navigationOptions: {
			tabBarLabel: 'ME',
		},
	},
	Feed: {
		screen: FeedContainer,
		navigationOptions: {
			tabBarLabel: 'FEED',
		},
	},
	Playlists: {
		screen: PlaylistsContainer,
		navigationOptions: {
			tabBarLabel: 'PLAYLISTS',
		},
	},
}, {
	tabBarOptions: {
		activeTintColor: '#fff',
		inactiveTintColor: '#fff',
		style: {
			backgroundColor: '#fff', // #ff6666
			// elevation: 0,
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
			header: ({ navigation }) => <MainHeaderContainer navigation={navigation}/>,
		},
	},
	Search: {
		screen: SearchContainer,
		navigationOptions: {
			// headerRight: <Icon style={{paddingLeft: 245}} name="search" size={30} color="#fff" onPress={() => navigation.navigate('MyMusic')} />,
			title: 'YUEMI SEARCH',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
			},
		},
	},
	Settings: {
		screen: SettingsContainer,
		navigationOptions: {
			title: 'SETTINGS',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
			},
		},
	},
});

