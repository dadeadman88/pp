import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {COLORS, FONTSIZE, screenHeight} from '../../constants';
import {Typography} from './Typography';

const BottomSheet = forwardRef((props, ref) => {
  const [item, setItem] = useState({
    title: '',
    options: [],
    onSelect: () => {},
    cancelButtonIndex: null,
    visibility: false,
    wrap: false,
  });

  useImperativeHandle(ref, () => ({
    show: ({title, options, onSelect, cancelButtonIndex, wrap = false}) => {
      setItem({
        title,
        options,
        onSelect,
        cancelButtonIndex,
        visibility: true,
        wrap,
      });
    },
    close: () => {
      setItem({...item, visibility: false});
    },
  }));

  return (
    <Modal animationType="slide" transparent={true} visible={item.visibility} statusBarTranslucent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={() => {
          setItem({...item, visibility: false});
        }}
      />
      <View
        style={[
          styles.modalView,
          {backgroundColor: COLORS.white},
        ]}>
        { item.title && <Typography
          size={FONTSIZE.L}
          color={COLORS.secondary}
          align={'center'}
          style={{marginBottom: 10}}>
          {item.title}
        </Typography>}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={item.wrap ? styles.contantWrap : {}}>
            {item.options.map((i, index) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginVertical: 5,
                }}
                onPress={() => {
                  if (item.cancelButtonIndex === index) {
                    setItem({...item, visibility: false});
                  } else {
                    item.onSelect(index);
                  }
                }}
                key={index}>
                <Typography
                  align="center"
                  color={
                    item.cancelButtonIndex === index ? 'red' : COLORS.black
                  }>
                  {i}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    padding: 20,
    width: '100%',
    maxHeight: screenHeight(90),
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    zIndex: 1,
  },
  contantWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default BottomSheet;
