import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import RNMasonryScroll from 'react-native-masonry-scrollview';
import { useNavigation } from '@react-navigation/native';
import Skeleton from '../components/Skeleton';
import PictureCard from '../components/PictureCard/SmallPictureCard';
import Color from '../constants/Colors';
import useFavorites from '../hooks/useFavorites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark.background,
  },
});

/**
 * Masonry style screen displaying user's favorites posts
 * Posts can be removed by pressing the heart icon
*/
export default function FavoriteScreen(): JSX.Element {
  const navigation = useNavigation();
  const { images, refreshing, handleUnFave, handleRefresh } = useFavorites();

  if (!images) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Skeleton style={{ marginTop: '6%' }} />
        <Skeleton style={{ marginTop: '6%' }} />
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: Color.dark.background }}>
      <RNMasonryScroll
        columns={2}
        oddColumnStyle={{ marginLeft: 2, marginRight: 5 }}
        evenColumnStyle={{ marginLeft: 8, marginRight: 2 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((item, index) => (
          <PictureCard
            key={index.toString()}
            style={{
              marginTop: index < 2 ? 10 : 0,
              marginBottom: 5,
            }}
            onPress={() => navigation.navigate('PictureScreen', { data: item })}
            onSuppress={() => handleUnFave(item.id)}
            id={item.id}
            width={item.width}
            height={item.height}
            ups={item.ups}
            link={item.link}
            type={item.type}
            title={item.title}
            cardType="favorite"
          />
        ))}
      </RNMasonryScroll>
    </View>
  );
}
