import React, { useEffect, useState, useRef } from 'react';
import { Camera, CameraCapturedPicture } from 'expo-camera';

interface CameraType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cameraType: any;
  cameraRef: React.MutableRefObject<Camera | undefined>;
  cameraHasPermission: number;
  takePicture: () => Promise<CameraCapturedPicture | undefined>;
  AllowCamera: () => Promise<number>;
  handleCameraType: () => void;
}

export function useCamera(): CameraType {
  const [cameraHasPermission,
    setCameraHasPermission] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera>();

  useEffect(() => {
    (async (): Promise<void> => {
      const cameraPerm = await Camera.getPermissionsAsync();
      setCameraHasPermission(cameraPerm.status === 'granted' ? 1 : -1);
    })();
  }, []);

  const AllowCamera = async (): Promise<number> => {
    const { status } = await Camera.requestPermissionsAsync();
    setCameraHasPermission(status === 'granted' ? 1 : -1);
    return status === 'granted' ? 1 : -1;
  };

  const handleCameraType = (): void => {
    const currentCameraType = cameraType;
    setCameraType(
      currentCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const takePicture = async (): Promise<CameraCapturedPicture | undefined> => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 1, base64: true });
      return photo;
    }
    return undefined;
  };

  return {
    cameraRef,
    cameraHasPermission,
    cameraType,
    takePicture,
    AllowCamera,
    handleCameraType };
}
