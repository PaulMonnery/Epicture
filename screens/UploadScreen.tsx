import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImageManipulator from 'expo-image-manipulator';
import { useImagePicker } from '../hooks/useImagePicker';
import { useCamera } from '../hooks/useCamera';
import Color from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Color.dark.background,
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    height: '28%',
    borderRadius: 5,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

/**
 * Screen with 3 options to create a post: *Camera*, *Camera roll* and *File browser*.
 * Leads to PostDraft Screen
*/
export default function UploadScreen(): JSX.Element {
  const pickImage = useImagePicker();
  const { cameraHasPermission, AllowCamera } = useCamera();
  const navigation = useNavigation();

  const openCamera = async (): Promise<void> => {
    if (cameraHasPermission !== 1) {
      if (await AllowCamera() === 1) navigation.navigate('CameraScreen');
    } else navigation.navigate('CameraScreen');
  };

  const onPickImage = async ():Promise<void> => {
    const res = await pickImage();
    if (res) navigation.navigate('PostDraftScreen', { image: res });
  };

  const openFileBrowser = async (): Promise<void> => {
    const res = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    if (res.type === 'success') {
      Image.getSize(res.uri, async (width, height) => {
        const imageData = await ImageManipulator.manipulateAsync(res.uri, undefined,
          { base64: true });
        const ext = res.uri.substr(res.uri.lastIndexOf('.') + 1).toLocaleLowerCase();
        const img = { uri: res.uri, type: ext === 'mp4' || ext === 'mov' ? 'video' : 'image', height, width, base64: imageData.base64 };
        navigation.navigate('PostDraftScreen', { image: img });
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openCamera}
        style={styles.button}
        activeOpacity={0.85}
      >
        <LinearGradient
          style={styles.gradient}
          colors={['#e5afcd', '#9cbae6']}
        >
          <Text style={styles.buttonText}>
            Camera
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onPickImage}
        activeOpacity={0.85}
      >
        <LinearGradient
          style={styles.gradient}
          colors={['#edbb37', '#59bf9d']}
        >
          <Text style={styles.buttonText}>
            Import from photo library
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={openFileBrowser}
        activeOpacity={0.85}
      >
        <LinearGradient
          style={styles.gradient}
          colors={['#fd4127', '#fc9e40']}
        >
          <Text style={styles.buttonText}>
            Browse
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
