import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../types/navigationTypes';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth } from '../utils/auth';
import PostDraft from '../screens/UploadScreens/PostDraft';
import Dimensions from '../constants/Layout';
import Camera from '../screens/UploadScreens/Camera';
import Picture from '../screens/PictureScreen';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  const { state } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Root"
        component={state.userToken ? BottomTabNavigator : AuthNavigator}
      />
      <Stack.Screen
        name="PictureScreen"
        component={Picture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={Camera}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="PostDraftScreen"
        component={PostDraft}
        options={{
          headerShown: true,
          headerTitle: '',
          gestureEnabled: false,
          headerStyle: { height: Dimensions.window.height * 0.12 },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
