import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileTabParamList } from '../types/navigationTypes';
import ProfileAboutScreen from '../screens/ProfileScreens/ProfileAboutScreen';
import ProfilePostsScreen from '../screens/ProfileScreens/ProfilePostsScreen';
import ProfileFavoriteScreen from '../screens/FavoriteScreen';
import ProfileSettingsScreen from '../screens/ProfileScreens/ProfileSettingsScreen';

const ProfileTab = createMaterialTopTabNavigator<ProfileTabParamList>();

export default function ProfileTabNavigator(): JSX.Element {
  return (
    <ProfileTab.Navigator
      initialRouteName="Posts"
      tabBarOptions={{
        labelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'none' },
        style: { backgroundColor: '#202023', borderBottomWidth: 2, borderBottomColor: '#1a1a1d' },
        indicatorStyle: { backgroundColor: '#fff', height: 3, marginBottom: -1 },
      }}
    >
      <ProfileTab.Screen name="Posts" component={ProfilePostsScreen} />
      <ProfileTab.Screen name="Favorites" component={ProfileFavoriteScreen} />
      <ProfileTab.Screen name="About" component={ProfileAboutScreen} />
      <ProfileTab.Screen name="Settings" component={ProfileSettingsScreen} />
    </ProfileTab.Navigator>
  );
}
