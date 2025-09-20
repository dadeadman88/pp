import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {COLORS, FONTSIZE, screenHeight} from '../../constants';
import {Typography} from './Typography';
import { Button } from './Button';
import { InputText } from './InputText';
import { CheckBox } from './CheckBox';

const ConfirmationModal = forwardRef((props, ref) => {

  const [selection, setSelection] = useState();
  const [item, setItem] = useState({
    title: '',
    body: '',
    options: [],
    onSelect: () => {},
    visibility: false
  });

  useImperativeHandle(ref, () => ({
    open: ({title, body, options = [], onSelect}) => {
      setItem({
        title,
        body,
        options,
        onSelect,
      });
    },
    close: () => {
      setItem({...item, visibility: false});
    },
  }));

  const REASON = [
    `Morbi sed turpis nec turpis.`,
    `Aliquam eu risus ultrices, rhoncu.`,
    `Aliquam eu risus ultrices, rhoncu.`,
    `Aliquam eu risus ultrices, rhoncu.`,
    `Other`
  ]

  return (
    <Modal animationType="fade" transparent={true} visible={item.visibility} statusBarTranslucent={true} onRequestClose={() => setItem({...item, visibility: false})}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <View
        style={[
          styles.modalView,
          {backgroundColor: COLORS.white},
        ]}>
        <Typography
          size={18}
          align={'center'}
          textType='semiBold'>
          Cancel Booking
        </Typography>

        <Typography
          size={14}
          color={COLORS.darkGray}
          align={'center'}>
          Please enter select your reason to for canceling this booking
        </Typography>

        {REASON.map((i, index) => <CheckBox children={i} checked={selection == index} onChange={e => {
          setSelection(index);
        }} />)}

        <InputText
          placeholder={'Type here...'}
          multiline={true}
          inputProps={{
            numberOfLines: 8,
            textAlignVertical: 'top',
            verticalAlign: 'top',
          }}
        />

        <Button label={`Cancel Booking`} backgroundColor={'#FF6961'} isGradient={false} onPress={item.onSelect} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    padding: 30,
    width: '100%',
    maxHeight: screenHeight(90),
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    zIndex: 1,
    gap: 20
  }
});

export default ConfirmationModal;
