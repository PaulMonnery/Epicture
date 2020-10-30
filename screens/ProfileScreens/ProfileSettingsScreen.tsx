import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TextInput, View, Keyboard, ScrollView } from 'react-native';
import Color from '../../constants/Colors';
import { getUserSettings, getUserBase, updateUserSettings } from '../../network/user';
import CheckBox from '../../components/Checkbox';
import Settings from '../../types/settings';
import Button from '../../components/Buttons/LoginButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.dark.background,
  },
  box: {
    width: '85%',
    justifyContent: 'center',
    marginTop: '4%',
  },
  titleInput: {
    fontSize: 17,
    width: '100%',
    backgroundColor: '#2e3034',
    padding: 15,
    paddingTop: 15,
    color: 'white',
    textAlignVertical: 'center',
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  checkboxText: {
    marginLeft: 10,
    padding: 15,
    color: 'white',
    fontSize: 17,
  },
});

/**
 * Profile subscreen
 * Displays the current user settings and allow him to update them
*/
export default function ProfileSettingsScreen(): JSX.Element {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const res = await getUserSettings();
      if (res) setSettings(res);
    };
    const loadBio = async () => {
      const res = await getUserBase();
      if (res) setBio(res.bio);
    };
    if (!settings) loadSettings();
    if (!bio) loadBio();
  }, [settings, bio]);

  const handleSubmit = async () => {
    if (settings && bio) {
      await updateUserSettings(
        settings.account_url, bio, settings.messaging_enabled, settings.public_images,
        settings.show_mature, settings.newsletter_subscribed,
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <View style={[styles.box]}>
        <Text style={{ color: 'white', marginBottom: 5 }}>Username</Text>
        <TextInput
          placeholder="Username"
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          value={settings?.account_url}
          onSubmitEditing={() => Keyboard.dismiss()}
          style={styles.titleInput}
          placeholderTextColor="#a0a1a3"
          onChangeText={(text) => settings && setSettings({ ...settings, account_url: text })}
        />
        <Text style={{ color: 'white', marginBottom: 5, marginTop: 15 }}>Bio</Text>
        <TextInput
          placeholder="Bio"
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          value={bio || ''}
          onSubmitEditing={() => Keyboard.dismiss()}
          style={[styles.titleInput, { marginBottom: 10 }]}
          placeholderTextColor="#a0a1a3"
          onChangeText={(text) => setBio(text)}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={settings?.show_mature || false}
            onPress={() => settings
              && setSettings({ ...settings, show_mature: !settings.show_mature })}
          />
          <Text style={styles.checkboxText}>Show mature posts and comments</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={settings?.messaging_enabled || false}
            onPress={() => settings
              && setSettings({ ...settings, messaging_enabled: !settings.messaging_enabled })}
          />
          <Text style={styles.checkboxText}>Allow direct messaging</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={settings?.public_images || false}
            onPress={() => settings
              && setSettings({ ...settings, public_images: !settings.public_images })}
          />
          <Text style={styles.checkboxText}>Set images as public by default</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={settings?.newsletter_subscribed || false}
            onPress={() => settings && setSettings(
              { ...settings, newsletter_subscribed: !settings.newsletter_subscribed },
            )}
          />
          <Text style={styles.checkboxText}>Subscription to news letter</Text>
        </View>
        <Button
          text="Save settings"
          buttonStyle={{ width: '100%', marginBottom: 25, marginTop: 15, backgroundColor: '#18b36b' }}
          textStyle={{ color: 'white' }}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}
