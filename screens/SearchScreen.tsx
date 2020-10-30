import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Keyboard, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Color from '../constants/Colors';
import Skeleton from '../components/Skeleton';
import PictureCard from '../components/PictureCard/BigPictureCard';
import Dimensions from '../constants/Layout';
import useFeedSearch from '../hooks/useFeedSearch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.dark.background,
  },
  searchBar: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.window.width * 0.9,
    height: '75%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 5,
    borderRadius: 50,
    flexDirection: 'row',
  },
  titleInput: {
    fontSize: 17,
    width: '85%',
    height: '100%',
    marginLeft: 5,
    color: 'white',
    textAlignVertical: 'center',
    borderRadius: 5,
  },
});

const SearchBar = ({ onValidate }: {onValidate: (finalString: string) => void}) => {
  const [searchString, setSearchString] = useState('');

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search Imgur"
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        value={searchString}
        onSubmitEditing={() => {
          onValidate(searchString);
          Keyboard.dismiss();
        }}
        style={styles.titleInput}
        placeholderTextColor="#b9d3dc"
        onChangeText={(t) => setSearchString(t)}
      />
      <AntDesign size={20} name="search1" color="#b9d3dc" />
    </View>
  );
};

/**
 * Basic screen with a search bar in header to find posts linked to a keyword
*/
export default function SearchScreen(): JSX.Element {
  const navigation = useNavigation();
  const { images, searchString, refreshing,
    handleRefresh, loadNewPage, setSearchString } = useFeedSearch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar onValidate={setSearchString} />
      ),
    });
  }, [navigation, setSearchString]);

  if (!searchString) return (<View style={styles.container} />);
  if (searchString && !images) {
    return (
      <View style={{ flex: 1, backgroundColor: Color.dark.background, alignItems: 'center' }}>
        <Skeleton style={{ marginTop: '6%' }} />
        <Skeleton style={{ marginTop: '6%' }} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
