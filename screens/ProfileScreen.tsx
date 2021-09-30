import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';
import Dimensions from '../constants/Layout';
import { getUserBase, getUserSettings } from '../network/user';
import UserBase from '../types/userBase';
import LogoutPicto from '../components/Svg/Logout';
import { useAuth } from '../utils/auth';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.window.height * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signout: {
    position: 'absolute',
    right: '3%',
    top: '20%',
    padding: 10,
  },
});

/**
 * Profile screen with profile user picture, score and verification.
 * Displays a sub tab navigator
 */
export default function ProfileScreen(): JSX.Element {
  const [state] = useState(useAuth().state);
  const [userBase, setUserBase] = useState<UserBase | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const loadUserBase = async () => {
      const res = await getUserBase();
      await getUserSettings();
      if (res) setUserBase(res);
    };
    if (!userBase) loadUserBase();
  }, [userBase]);

  const confirmSignOut = () => {
    Alert.alert(
      'Warning',
      'You are about to sign out, are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yup',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              alert(error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <>
      <LinearGradient colors={['#a96465', '#321d35']} style={styles.container}>
        <TouchableOpacity style={styles.signout} onPress={confirmSignOut}>
          <LogoutPicto color="white" width={20} height={20} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', margin: 15 }}>
          <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: userBase?.avatar }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                marginLeft: 10,
                color: 'white',
                fontWeight: 'bold',
                fontSize: 27,
                marginBottom: 10,
              }}
            >
              {state.username || ''}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                marginLeft: 12,
                color: 'white',
                fontWeight: '600',
                fontSize: 17,
                textTransform: 'uppercase',
              }}
            >
              {userBase?.reputation || ''}
              {userBase?.reputation ? ' · ' : ''}
              {userBase?.reputation_name || ''}
            </Text>
          </View>
        </View>
      </LinearGradient>
      <ProfileTabNavigator />
    </>
  );
}
