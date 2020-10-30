import React from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard } from 'react-native';
import { Video } from 'expo-av';
import Dimensions from '../../constants/Layout';

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  titleInput: {
    fontSize: 17,
    width: '100%',
    backgroundColor: '#2e3034',
    padding: 15,
    color: 'white',
    textAlignVertical: 'center',
    paddingTop: 15,
  },
  imageContainer: {
    display: 'flex',
    backgroundColor: '#33353a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
});

interface ImageType {
  uri: string,
  height: number,
  width: number,
  type: string
  description: string;
  setDescription: (description: string) => void;
}

/**
 * Picture card component used in the PostDraft screen.
 * Receives all the API info by the `image` props
*/
const UploadPictureCard = (image: ImageType): JSX.Element => {
  const getDimension = (): {width: number, height: number} => {
    const ratio = (Dimensions.window.width * 0.95) / image.width;
    return ({ width: image.width, height: image.height * ratio });
  };

  return (
    <View style={[styles.imageContainer, { width: '100%' }]}>
      {
        image.type === 'video'
          ? (
            <Video
              source={{ uri: image.uri }}
              shouldPlay
              style={[styles.image, { height: getDimension().height }]}
              isLooping
              isMuted
              usePoster
              resizeMode="contain"
            />
          )
          : (
            <Image
              source={{ uri: image.uri }}
              style={[styles.image, { height: getDimension().height }]}
            />
          )
      }
      <View style={styles.footer}>
        <TextInput
          placeholder="Description, #tags and @mentions"
          keyboardType="default"
          returnKeyType="done"
          multiline
          value={image.description}
          blurOnSubmit
          onSubmitEditing={() => Keyboard.dismiss()}
          style={styles.titleInput}
          placeholderTextColor="#a0a1a3"
          onChangeText={(text) => image.setDescription(text)}
        />
      </View>
    </View>
  );
};
export default UploadPictureCard;
