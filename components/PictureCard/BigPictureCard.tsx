import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Share } from 'react-native';
import { Video } from 'expo-av';
import Dimensions from '../../constants/Layout';
import { faveAlbum, voteAlbum } from '../../network/album';
import UpvotePicto from '../Svg/Upvote';
import HeartPicto from '../Svg/Heart';
import CommentPicto from '../Svg/Comment';
import SharePicto from '../Svg/Share';
import EyePicto from '../Svg/Eye';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#33353a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
    backgroundColor: '#33353a',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
  },
  firtLine: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginRight: 10,
    marginTop: 5,
  },
  greyText: {
    color: '#9198a7',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 13,
  },
  follow: {
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    margin: 13,
    marginBottom: 5,
    alignSelf: 'flex-start',
    maxHeight: 100,
  },
  descriptionText: {
    color: 'white',
    fontSize: 15,
  },
  buttonsRow: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
});

interface BigPictureCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
  onPress?: () => void;
  onFave?: (id: string) => void;

  id : string;
  width : number;
  height : number;
  favorite : boolean;
  ups: number;
  comment_count: number;
  favorite_count: number;
  vote : null | string;
  link: string;
  views: number;
  account_url: string;
  type: string;
  title: string;
  description: null | string;
}

/**
 * Picture card component used in the home and search screens.
 * Receives all the API info by props
*/
const BigPictureCard = (
  { onPress, onFave, style, id, width, height, favorite, ups, comment_count,
    favorite_count, vote, link, views, account_url, type, title, description }
  : BigPictureCardProps,
): JSX.Element => {
  const getDimension = (): {width: number, height: number} => {
    const ratio = (Dimensions.window.width - 30) / width;
    return ({ width, height: height * ratio });
  };
  const [faved, setFaved] = useState<boolean>(favorite);
  const [voted, setVoted] = useState<boolean>(vote === 'up');

  const handleShare = async () => {
    try {
      await Share.share({ url: link });
    } catch (error) { alert(error.message); }
  };

  const handleFave = async () => {
    try {
      if (onFave) onFave(id);
      setFaved(!faved);
      await faveAlbum(id);
    } catch (error) { alert(error.message); }
  };

  const handleVote = async () => {
    try {
      setVoted(!voted);
      await voteAlbum(id, voted ? 'veto' : 'up');
    } catch (error) { alert(error.message); }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      style={[style, styles.container]}
    >
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: `https://imgur.com/user/${account_url}/avatar` }}
            style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
          />
          <View style={styles.headerTextContainer}>
            <Text numberOfLines={5} style={styles.title}>{title.trim()}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.firtLine}>
                <Text style={styles.greyText}>
                  {account_url.substring(0, 17)}
                  {' '}
                  ·
                </Text>
                <TouchableOpacity onPress={() => alert('TODO')}>
                  <Text style={styles.follow}>follow</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewContainer}>
                <Text style={styles.greyText}>{views}</Text>
                <EyePicto color="#9198a7" width={15} height={15} />
              </View>
            </View>

          </View>
        </View>
      </View>
      {
        type === 'video/mp4'
          ? (
            <Video
              source={{ uri: link }}
              shouldPlay
              resizeMode="contain"
              style={[styles.image, { height: getDimension().height }]}
              isLooping
              isMuted
              usePoster
            />
          )
          : (
            <Image
              source={{ uri: link }}
              style={[styles.image, { height: getDimension().height }]}
              resizeMode="contain"
            />
          )
      }
      {
        description ? (
          <View style={styles.description}>
            <Text numberOfLines={6} ellipsizeMode="tail" style={styles.descriptionText}>{description}</Text>
          </View>
        )
          : (<></>)
      }
      <View style={[styles.buttonsRow, { marginTop: description ? 0 : 5 }]}>
        <TouchableOpacity
          style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
          onPress={(): Promise<void> => handleVote()}
        >
          <UpvotePicto strokeWidth={2} stroke={voted ? '#43d1bd' : 'white'} color={voted ? '#43d1bd' : 'transparent'} width={35} height={35} />
          <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>{ups + (voted ? 1 : 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
          onPress={(): void => alert('comment')}
        >
          <CommentPicto strokeWidth={2} stroke="white" color="transparent" width={35} height={35} />
          <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>{comment_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
          onPress={(): Promise<void> => handleFave()}
        >
          <HeartPicto strokeWidth={2} stroke={faved ? '#43d1bd' : 'white'} color={faved ? '#43d1bd' : 'transparent'} width={35} height={35} />
          <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>{favorite_count + (faved ? 1 : 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
          onPress={(): Promise<void> => handleShare()}
        >
          <SharePicto color="white" width={35} height={35} style={{ alignItems: 'center' }} />
          <Text style={{ marginLeft: -6, marginRight: 7, color: 'white', fontWeight: 'bold', fontSize: 12 }}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BigPictureCard;
