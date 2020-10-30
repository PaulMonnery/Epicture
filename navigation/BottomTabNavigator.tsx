import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Layout';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import UploadScreen from '../screens/UploadScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  BottomTabParamList,
  HomeParamList,
  SearchParamList,
  UploadParamList,
  FavoriteParamList,
  ProfileParamList,
} from '../types/navigationTypes';

const HomeStack = createStackNavigator<HomeParamList>();
const SearchStack = createStackNavigator<SearchParamList>();
const UploadStack = createStackNavigator<UploadParamList>();
const FavoriteStack = createStackNavigator<FavoriteParamList>();
const ProfileStack = createStackNavigator<ProfileParamList>();

const LinearGradientHeader = (): JSX.Element => (
  <LinearGradient
    colors={['#397195', '#4ba06a']}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  />
);

function HomeNavigator(): JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Feed',
          headerBackground: () => <LinearGradientHeader />,
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        }}
      />
    </HomeStack.Navigator>
  );
}

function SearchNavigator(): JSX.Element {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          headerBackground: () => <LinearGradientHeader />,
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        }}
      />
    </SearchStack.Navigator>
  );
}

function UploadNavigator(): JSX.Element {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          headerTitle: 'New Post',
          headerBackground: () => <LinearGradientHeader />,
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        }}
      />
    </UploadStack.Navigator>
  );
}

function FavoriteNavigator(): JSX.Element {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerTitle: 'Favorites',
          headerBackground: () => <LinearGradientHeader />,
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        }}
      />
    </FavoriteStack.Navigator>
  );
}

function ProfileNavigator(): JSX.Element {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: 'My profile',
          headerBackground: () => <LinearGradientHeader />,
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
        }}
      />
    </ProfileStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        adaptive: true,
        style: {
          display: 'flex',
          backgroundColor: Colors.dark.lightGrey,
          height: '8%',
          borderTopColor: 'transparent',
        },
        tabStyle: {
          marginTop: Dimensions.window.height > 800 ? 12 : 0,
        },
        activeTintColor: Colors.dark.green,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }: {color: string}) => <AntDesign size={30} name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }: {color: string}) => <AntDesign size={30} name="search1" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={UploadNavigator}
        options={{
          tabBarIcon: ({ color }: {color: string}) => <Entypo size={30} name="squared-plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteNavigator}
        options={{
          tabBarIcon: ({ color }: {color: string}) => <AntDesign size={30} name="hearto" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }: {color: string}) => <MaterialIcons size={30} name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
