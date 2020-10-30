import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors';
import { getUserBase, getUserSubmissions, getUserFavorite, getUserComments } from '../../network/user';
import UserBase from '../../types/userBase';
import UpvotePicto from '../../components/Svg/Upvote';
import HeartPicto from '../../components/Svg/Heart';
import CommentPicto from '../../components/Svg/Comment';
import PostPicto from '../../components/Svg/Post';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Color.dark.background,
  },
  statBox: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
    borderRadius: 5,
    backgroundColor: '#2e3034',
    overflow: 'hidden',
  },
  button: {
    width: '90%',
    height: '28%',
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#2e3034',
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  bio: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
    margin: 20,
  },
});

/**
 * Simple screen that displays stats and informations about the user
*/
export default function ProfileAboutScreen(): JSX.Element {
  const [userBase, setUserBase] = useState<UserBase | null>(null);
  const [nbPosts, setNbPosts] = useState(0);
  const [nbFavorites, setNbFavorites] = useState(0);
  const [nbComments, setNbComments] = useState(0);

  useEffect(() => {
    const loadUserBase = async () => {
      const res = await getUserBase();
      if (res) setUserBase(res);
    };
    const getNbPosts = async () => {
      const res = await getUserSubmissions();
      if (res) setNbPosts(res.length);
    };
    const getNbFavorites = async () => {
      const res = await getUserFavorite();
      if (res) setNbFavorites(res.length);
    };
    const getNbComments = async () => {
      const res = await getUserComments();
      if (res) setNbComments(res.length);
    };
    if (!userBase) loadUserBase();
    if (!nbPosts) getNbPosts();
    if (!nbFavorites) getNbFavorites();
    if (!nbComments) getNbComments();
  }, [userBase, nbPosts, nbFavorites, nbComments]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.statBox]}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {userBase?.reputation_name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UpvotePicto color="#56b474" width={60} height={60} />
          <Text style={{ marginLeft: -5, color: '#56b474', fontSize: 40, fontWeight: 'bold' }}>
            {userBase?.reputation}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statBox, { flexDirection: 'row', justifyContent: 'space-around' }]}
        activeOpacity={0.85}
      >

        <View style={{ marginVertical: '5%', alignItems: 'center', flexDirection: 'column', width: '30%' }}>
          <PostPicto color="#56b474" width={45} height={45} />
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Posts</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
            {nbPosts}
          </Text>
        </View>
        <View style={{ marginVertical: '5%', alignItems: 'center', flexDirection: 'column', width: '30%' }}>
          <HeartPicto color="#6fcdbd" width={45} height={45} />
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Favorites</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
            {nbFavorites}
          </Text>
        </View>
        <View style={{ marginVertical: '5%', alignItems: 'center', flexDirection: 'column', width: '30%' }}>
          <CommentPicto color="#7d84ef" width={45} height={45} />
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Comments</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
            {nbComments}
          </Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statBox]}
        activeOpacity={0.85}
      >
        <Text style={styles.bio}>
          {userBase?.bio}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.statBox]}
        activeOpacity={0.85}
      >
        <Text style={styles.bio}>
          Joined
          {' '}
          { new Date(userBase?.created * 1000).toDateString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
