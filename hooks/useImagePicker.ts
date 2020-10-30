import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export function useImagePicker(): () => Promise<ImageInfo | null> {
  const [rollHasPermission, setRollHasPermission] = useState(0);

  useEffect(() => {
    (async (): Promise<void> => {
      const imagePerm = await ImagePicker.getCameraRollPermissionsAsync();
      setRollHasPermission(imagePerm.status === 'granted' ? 1 : -1);
    })();
  }, []);

  const AllowCameraRoll = async (): Promise<void> => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      setRollHasPermission(status === 'granted' ? 1 : -1);
    }
  };

  return async (): Promise<ImageInfo | null> => {
    if (rollHasPermission === -1) await AllowCameraRoll();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });
    return (result.cancelled ? null : result);
  };
}
