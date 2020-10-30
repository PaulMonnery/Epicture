import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import Dimensions from '../../constants/Layout';
import UpvotePicto from '../Svg/Upvote';
import TrashPicto from '../Svg/Trash';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#33353a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
  buttonsRow: {
    marginBottom: 8,
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

interface SmallPictureCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
  onPress?: () => void;
  onSuppress?: (id: string) => void;

  id : string;
  width : number;
  height : number;
  ups : number;
  link: string;
  type: string;
  title: string;
  cardType: 'submission' | 'favorite';
}

/**
 * Picture card component used in the favorites and submissions screens.
 * Receives all the API info by props
*/
const SmallPictureCard = (
  { onPress, onSuppress, style, id, width, height, ups, link, type, title, cardType }
  : SmallPictureCardProps,
): JSX.Element => {
  const getDimension = (): {width: number, height: number} => {
    const ratio = (Dimensions.window.width / 2.1) / width;
    return ({ width, height: height * ratio });
  };

  const handleSuppress = async () => {
    Alert.alert(
      'Warning',
      `You are about to delete one of you ${cardType}s, are you sure?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yup',
          onPress: async () => {
            try {
              if (onSuppress) onSuppress(id);
            } catch (error) { alert(error.message); }
          } },
      ],
      { cancelable: false },
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({ url: link });
    } catch (error) { alert(error.message); }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={handleShare}
      activeOpacity={0.95}
      style={[style, styles.container,
        { width: Dimensions.window.width / 2.1 }]}
    >
      {
        type === 'video/mp4'
          ? (
            <Video
              source={{ uri: link }}
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
              source={{ uri: link }}
              style={[styles.image, { height: getDimension().height }]}
            />
          )
      }
      <View style={styles.footer}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: 'white', marginTop: 10, marginHorizontal: 10, fontWeight: 'bold', fontSize: 15, alignSelf: 'flex-start' }}
        >
          {title}
        </Text>
        <View style={[
          styles.buttonsRow, {
            justifyContent: 'space-between',
            marginHorizontal: 7,
          }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UpvotePicto color="#8e9094" width={20} height={20} />
            <Text style={{ color: '#8e9094' }}>
              {ups}
              {' '}
              points
            </Text>
          </View>
          <TouchableOpacity onPress={handleSuppress}>
            { cardType === 'favorite' ? (
              <Ionicons
                size={20}
                color="#43d1bd"
                name="ios-heart"
              />
            ) : (<TrashPicto color="white" height={25} width={25} />)}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SmallPictureCard;
