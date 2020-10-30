import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCamera } from '../../hooks/useCamera';

/**
 * Handmade camera screen
 * Expo doesn't support native camera screen
*/
export default function MyCamera(): JSX.Element {
  const navigation = useNavigation();
  const {
    cameraRef,
    cameraHasPermission,
    cameraType,
    takePicture,
    AllowCamera,
    handleCameraType } = useCamera();

  if (cameraHasPermission === 0) return <View />;
  if (cameraHasPermission === -1) {
    return (
      <TouchableOpacity onPress={AllowCamera}>
        <Text>No access to camera</Text>
      </TouchableOpacity>
    );
  }

  const handlePictureTaken = async (): Promise<void> => {
    const res = await takePicture();
    if (res) navigation.navigate('PostDraftScreen', { image: res });
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={cameraType}
        ref={cameraRef}
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={handlePictureTaken}
          >
            <FontAwesome
              name="camera"
              style={{ color: '#fff', fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={handleCameraType}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: '#fff', fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginTop: StatusBar.currentHeight || 10 + 25,
              backgroundColor: 'white',
              borderRadius: 5,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={navigation.goBack}
          >
            <Ionicons
              name="ios-arrow-back"
              style={{ color: '#000', fontSize: 25 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
