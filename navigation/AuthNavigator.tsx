import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { AuthStackParamList } from '../types/navigationTypes';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator(): JSX.Element {
  return (
    <AuthStack.Navigator
      headerMode="none"
    >
      <AuthStack.Screen
        name="Login"
        component={AuthScreen}
      />
    </AuthStack.Navigator>
  );
}
