import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PictureCard from '../components/PictureCard/BigPictureCard';
import Skeleton from '../components/Skeleton';
import FilterPicto from '../components/Svg/Filter';
import Color from '../constants/Colors';
import FilterModal from '../components/FilterModal';
import useFeed from '../hooks/useFeed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark.background,
  },
});

/**
 * Landing page component of the App, calls displays the user feed.
 * Can filter posts by *section*, *time* and *sort*
*/
export default function HomeScreen(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const { images, refreshing, info, setInfo, handleRefresh, loadNewPage } = useFeed();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{ padding: 10, marginLeft: 10 }}
        >
          <FilterPicto color="white" width={18} height={18} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (!images) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Skeleton style={{ marginTop: '6%' }} />
        <Skeleton style={{ marginTop: '6%' }} />
      </View>
    );
  }
  return (
    <View>
      <FilterModal
        info={info}
        shown={showModal}
        close={() => setShowModal(false)}
        updateInfo={setInfo}
      />
      <FlatList
        data={images}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item, index) => `${index}`}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        onEndReached={() => loadNewPage()}
        renderItem={({ item }) => (
          <PictureCard
            onPress={() => navigation.navigate('PictureScreen', { data: item })}
            id={item.id}
            width={item.width}
            height={item.height}
            favorite={item.favorite}
            ups={item.ups}
            comment_count={item.comment_count}
            favorite_count={item.favorite_count}
            vote={item.vote}
            link={item.link}
            views={item.views}
            account_url={item.account_url}
            type={item.type}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </View>
  );
}
