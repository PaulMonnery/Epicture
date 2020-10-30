import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { GalleryOptions } from '../network/gallery';
import Dimensions from '../constants/Layout';

const styles = StyleSheet.create({
  centeredView: {
    flex: 0,
    margin: 0,
    width: Dimensions.window.width > 400 ? '70%' : '80%',
    height: Dimensions.window.height > 700 ? '30%' : '38%',
    marginLeft: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    backgroundColor: '#757a83',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
    borderTopLeftRadius: 1,
    width: '100%',
  },
  modalTitle: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 5,
    color: '#b0b4bd',
  },
  arrow: {
    borderRadius: 5,
    backgroundColor: '#757a83',
    height: 27,
    width: 27,
    position: 'absolute',
    left: 3.25,
    top: -11,
    transform: [{ rotate: '45deg' }],
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 20,
  },
  selectedIndicator: {
    borderColor: '#b9f6d5',
    borderWidth: 2,
    marginRight: 5,
    height: '90%',
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});

interface FilterModalProps {
  close: () => void;
  updateInfo: (info: GalleryOptions) => void;
  shown: boolean;
  info: GalleryOptions;
}

/**
 * Modal used to change feed options.
 * Uses `react-native-modal`
*/
const FilterModal = ({ close, updateInfo, shown, info }: FilterModalProps): JSX.Element => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    isVisible={shown}
    coverScreen={false}
    onBackdropPress={() => close()}
    backdropOpacity={0.2}
    style={styles.centeredView}
  >
    <TouchableOpacity activeOpacity={1} style={styles.modalView} onPress={() => {}}>
      <View style={styles.arrow} />
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
          <Text style={styles.modalTitle}>Post Type</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, section: 'hot' })} style={styles.modalButton}>
            {info.section === 'hot' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.section === 'hot' ? 'bold' : '600' }]}>Hot</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, section: 'top' })} style={styles.modalButton}>
            {info.section === 'top' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.section === 'top' ? 'bold' : '600' }]}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, section: 'user' })} style={styles.modalButton}>
            {info.section === 'user' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.section === 'user' ? 'bold' : '600' }]}>User</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
          <Text style={styles.modalTitle}>Post Sorting</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, sort: 'viral' })} style={styles.modalButton}>
            {info.sort === 'viral' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.sort === 'viral' ? 'bold' : '600' }]}>Viral</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, sort: 'top' })} style={styles.modalButton}>
            {info.sort === 'top' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.sort === 'top' ? 'bold' : '600' }]}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => updateInfo({ ...info, sort: 'time' })} style={styles.modalButton}>
            {info.sort === 'time' ? <View style={styles.selectedIndicator} /> : <></>}
            <Text style={[styles.modalText, { fontWeight: info.sort === 'time' ? 'bold' : '600' }]}>Time</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

export default FilterModal;
