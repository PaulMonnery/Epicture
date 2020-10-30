import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    height: 400,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#525151',
  },
  titleContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    flex: 2,
  },
  descContainer: {
    width: '100%',
    padding: 20,
    flex: 1,
  },
  top: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,

  },
});

const firstLayout = [
  {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  {
    width: '80%',
    height: 30,
  },
];
const secondLayout = [
  {
    width: '95%',
    height: 100,
    marginBottom: 10,
  },
  {
    width: '85%',
    height: 40,
  },
];
const thirdLayout = [
  {
    width: '80%',
    height: 20,
    marginBottom: 6,
  },
  {
    width: '75%',
    height: 20,
  },
];

/**
 * Skeleton components displayed when a page is loading.
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Skeleton = ({ style }: {style: Record<string, any>}): JSX.Element => (
  <View style={[styles.card, style]}>
    <SkeletonContent
      containerStyle={styles.top}
      layout={firstLayout}
      isLoading
      boneColor="#7c7c7d"
      highlightColor="#999999"
    />
    <SkeletonContent
      containerStyle={styles.titleContainer}
      layout={secondLayout}
      isLoading
      boneColor="#7c7c7d"
      highlightColor="#999999"
    />
    <SkeletonContent
      layout={thirdLayout}
      containerStyle={styles.descContainer}
      isLoading
      boneColor="#7c7c7d"
      highlightColor="#999999"
    />
  </View>
);

export default Skeleton;
