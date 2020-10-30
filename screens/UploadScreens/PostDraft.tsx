import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dimensions from '../../constants/Layout';
import CheckBox from '../../components/Checkbox';
import UploadPictureCard from '../../components/PictureCard/UploadPictureCard';
import { uploadImage, shareImage } from '../../network/image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '5%',
    width: '95%',
    alignItems: 'center',
  },
  titleBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#474a50',
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
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
  checkboxArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 13,
  },
  checkboxZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textCheckboxZone: {
    marginLeft: 10,
    color:
    'white',
    fontSize: 16,
    marginRight: '20%',
  },
});

/**
 * Post creation Screen.
 * A *title* is required and the *description* is optional
*/
export default function PostDraft({ route }: {route: { params: { image: {
  uri: string, height: number, width: number, type: string, base64: string
}}}}): JSX.Element {
  const navigation = useNavigation();
  const history = useNavigationState((state) => state.routes);
  const [publicMode, setPublicMode] = React.useState<boolean>(true);
  const [matureMode, setMatureMode] = React.useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const handlePost = (): void => {
      if (!title) return;
      setLoading(true);
      uploadImage(route.params.image.base64, title, description)
        .then((data) => {
          if (publicMode) shareImage(data.id, title, matureMode);
          navigation.navigate({ key: history[0].key });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handlePost}
          style={{ padding: 20 }}
        >
          <Text style={{ fontWeight: 'bold', color: '#757a83', fontSize: 16 }}>{loading ? 'Loading' : 'Post'}</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({ key: history[0].key })}
          style={{ padding: 5, alignItems: 'center', justifyContent: 'center', width: 60, height: 60 }}
        >
          <Ionicons size={30} color="#757a83" name="ios-arrow-back" />
        </TouchableOpacity>
      ),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, history, loading, title, description, matureMode, publicMode]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      extraScrollHeight={Dimensions.window.height * 0.05}
    >
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TextInput
            placeholder="Post Title (required)"
            keyboardType="default"
            returnKeyType="done"
            multiline
            blurOnSubmit
            value={title}
            onSubmitEditing={() => Keyboard.dismiss()}
            numberOfLines={3}
            style={styles.titleInput}
            placeholderTextColor="#a0a1a3"
            onChangeText={(text) => setTitle(text)}
          />
          <View style={styles.checkboxArea}>
            <View style={styles.checkboxZone}>
              <Text style={styles.textCheckboxZone}>Public</Text>
              <CheckBox checked={publicMode} onPress={() => setPublicMode(!publicMode)} />
            </View>
            <View style={{ borderColor: '#2e3034', borderWidth: 1, marginVertical: 1 }} />
            <View style={styles.checkboxZone}>
              <Text style={styles.textCheckboxZone}>Mature</Text>
              <CheckBox checked={matureMode} onPress={() => setMatureMode(!matureMode)} />
            </View>
          </View>
        </View>
        <UploadPictureCard
          uri={route.params.image.uri}
          width={route.params.image.width}
          height={route.params.image.height}
          type={route.params.image.type}
          description={description}
          setDescription={setDescription}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
