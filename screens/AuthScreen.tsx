import * as React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { AUTH_CLIENT_ID, useAuth } from '../utils/auth';
import LoginButton from '../components/Buttons/LoginButton';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ImgurLogo = require('../assets/images/imgur_logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 160,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
  },
  logo: {
    position: 'absolute',
    bottom: 70,
    width: 110,
    height: 40,
    backgroundColor: 'transparent',
  },
});

/**
 * first screen when installed, opens a web browser to get the auth token
 * Updates the auth context on succes
*/
export default function AuthScreen(): JSX.Element {
  const { signIn } = useAuth();
  async function handleHelpPress() {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://api.imgur.com/oauth2/authorize?client_id=${AUTH_CLIENT_ID}&response_type=token&state=dev`,
      process.env.CALLBACK_URL || '?',
    );
    if (result.type === 'success') {
      const { queryParams } = Linking.parse(result.url.replace('#access_token', '&access_token'));
      if (queryParams?.access_token && queryParams?.account_username) {
        await signIn(queryParams?.access_token, queryParams?.account_username);
      }
    }
  }
  return (
    <LinearGradient
      style={styles.container}
      colors={['#0d134f', '#00cdac']}
    >
      <Text style={styles.title}>Epicture</Text>
      <Text style={styles.subtitle}>An EPITECH project</Text>
      <LoginButton
        onPress={handleHelpPress}
        text="Login with imgur"
        width="80%"
        buttonStyle={{ marginTop: 70 }}
      />
      <Image
        style={styles.logo}
        source={ImgurLogo}
        resizeMethod="scale"
        resizeMode="cover"
      />
    </LinearGradient>
  );
}
