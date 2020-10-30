import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, Share, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import Color from '../constants/Colors';
import Dimensions from '../constants/Layout';
import Skeleton from '../components/Skeleton';
import { getGalleryComments } from '../network/gallery';
import { faveAlbum, voteAlbum } from '../network/album';
import ImageType from '../types/image';
import CommentDto from '../types/comment';
import UpvotePicto from '../components/Svg/Upvote';
import HeartPicto from '../components/Svg/Heart';
import SharePicto from '../components/Svg/Share';
import EyePicto from '../components/Svg/Eye';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Color.dark.background,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
    backgroundColor: '#33353a',
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
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
});

const CommentBox = ({ commentData }: {commentData: CommentDto}) => (
  <View style={{ flex: 1, backgroundColor: '#3a3c41', marginBottom: 2 }}>
    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
      <Image
        source={{ uri: `https://imgur.com/user/${commentData.author_id}/avatar` }}
        style={{ width: 25, height: 25, borderRadius: 50, marginRight: 10 }}
      />
      <Text style={{ color: '#a6adbe', fontSize: 13, fontWeight: 'bold' }}>
        {commentData.author}
      </Text>
    </View>
    <Text style={{ marginLeft: 45, color: 'white', marginBottom: 15, fontSize: 15 }}>
      {commentData.comment}
    </Text>
  </View>
);

/**
 * Fullscreen view of a Post.
 * Loads the basic informations of the post and also comments
*/
export default function PictureScreen(
  { route }: {route: { params: { data: ImageType } };},
): JSX.Element {
  const { data } = route.params;
  const getDimension = (): {width: number, height: number} => {
    const ratio = Dimensions.window.width / data.width;
    return ({ width: data.width, height: data.height * ratio });
  };
  const [faved, setFaved] = useState<boolean>(data.favorite);
  const [voted, setVoted] = useState<boolean>(data.vote === 'up');
  const [comments, setComments] = useState<CommentDto[] | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      const ret = await getGalleryComments(data.id);
      setComments(ret);
    })();
  }, [data.id]);

  const handleShare = async () => {
    try {
      await Share.share({ url: data.link });
    } catch (error) { alert(error.message); }
  };

  const handleFave = async () => {
    try {
      setFaved(!faved);
      await faveAlbum(data.id);
    } catch (error) { alert(error.message); }
  };

  const handleVote = async () => {
    try {
      setVoted(!voted);
      await voteAlbum(data.id, voted ? 'veto' : 'up');
    } catch (error) { alert(error.message); }
  };

  if (!data) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Skeleton style={{ marginTop: '6%' }} />
        <Skeleton style={{ marginTop: '6%' }} />
      </View>
    );
  }

  return (
    <View style={{ height: '100%' }}>
      <View style={{ height: '5%', backgroundColor: '#33353a' }} />
      <ScrollView style={styles.container}>
        <View style={{ backgroundColor: '#33353a' }}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: `https://imgur.com/user/${data.account_url}/avatar` }}
                style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
              />
              <View style={styles.headerTextContainer}>
                <Text numberOfLines={5} style={styles.title}>{data.title.trim()}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.firtLine}>
                    <Text style={styles.greyText}>
                      {data.account_url.substring(0, 17)}
                      {' '}
                      ·
                    </Text>
                    <TouchableOpacity onPress={() => alert('TODO')}>
                      <Text style={styles.follow}>follow</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewContainer}>
                    <Text style={styles.greyText}>{data.views}</Text>
                    <EyePicto color="#9198a7" width={15} height={15} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          {
        data.type === 'video/mp4'
          ? (
            <Video
              source={{ uri: data.link }}
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
              source={{ uri: data.link }}
              style={[styles.image, { height: getDimension().height }]}
              resizeMode="contain"
            />
          )
        }
          {
        (data.description) ? (
          <View style={styles.description}>
            <Text numberOfLines={6} ellipsizeMode="tail" style={styles.descriptionText}>
              {data.description}
            </Text>
          </View>
        )
          : (<></>)
      }
          <View style={[styles.buttonsRow, { marginTop: data.description ? 0 : 5 }]}>
            <TouchableOpacity
              style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={(): Promise<void> => handleVote()}
            >
              <UpvotePicto strokeWidth={2} stroke={voted ? '#43d1bd' : 'white'} color={voted ? '#43d1bd' : 'transparent'} width={35} height={35} />
              <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>{data.ups + (voted ? 1 : 0)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={(): void => alert('comment')}
            >
              <UpvotePicto style={{ transform: [{ rotate: '180deg' }] }} strokeWidth={2} stroke="white" color="transparent" width={35} height={35} />
              <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>Downvote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={(): Promise<void> => handleFave()}
            >
              <HeartPicto strokeWidth={2} stroke={faved ? '#43d1bd' : 'white'} color={faved ? '#43d1bd' : 'transparent'} width={35} height={35} />
              <Text style={{ marginLeft: -2, color: 'white', fontWeight: 'bold', fontSize: 12 }}>{data.favorite_count + (faved ? 1 : 0)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
              onPress={(): Promise<void> => handleShare()}
            >
              <SharePicto color="white" width={35} height={35} style={{ alignItems: 'center' }} />
            </TouchableOpacity>
          </View>
          {
          comments
            ? (
              <View style={{
                marginTop: data.description ? 0 : 5,
              }}
              >
                { comments.map((comment, index) => (
                  <CommentBox key={index.toString()} commentData={comment} />
                ))}
              </View>
            )
            : <></>
          }
        </View>
        <View style={{ display: 'flex', height: 50, backgroundColor: Color.dark.background }} />
      </ScrollView>
    </View>
  );
}
