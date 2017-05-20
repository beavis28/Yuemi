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
import EditPlaylists from 'Yuemi/src/root/playlists/EditPlaylists';
import CreatePlaylist from 'Yuemi/src/root/playlists/CreatePlaylist';
import Playlist from 'Yuemi/src/root/playlists/Playlist';
import Header from 'Yuemi/src/root/header/Header';
import Search from 'Yuemi/src/root/search/Search';
import Settings from 'Yuemi/src/root/settings/Settings';
import EditSong from 'Yuemi/src/root/music/EditSong';

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
	swipeEnabled: true,
	tabBarOptions: {
		activeTintColor: '#fff',
		inactiveTintColor: '#fff',
		style: {
			backgroundColor: '#fff',
			height: 40,
		},
		labelStyle: {
			fontSize: 15,
			fontWeight: 'bold',
			marginTop: 1,
			color: '#ff6666',
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
				height: 75,
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
				height: 75,
			},
		},
	},
	EditPlaylists: {
		screen: EditPlaylists,
		navigationOptions: {
			title: 'EDIT PLAYLISTS',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
				height: 75,
			},
		},
	},
	Playlist: {
		screen: Playlist,
		navigationOptions: ({ navigation }) => ({
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
				height: 75,
			},
			title: navigation.state.params.playlist, // is laggy
		}),
	},
	EditSong: {
		screen: EditSong,
		navigationOptions: {
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#ff6666',
				height: 75,
			},
			title: 'EDIT SONG',
		},
	},
});


