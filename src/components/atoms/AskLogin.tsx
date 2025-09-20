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
import { useDispatch, useSelector } from 'react-redux';
import { selectAppState } from '../../store/selectors/appSelector';
import { Button } from './Button';
import { updateUserStates } from '../../store/actions/UserActions';
import { updateAppStates } from '../../store/actions/AppActions';

const AskLogin = (props) => {

  const dispatch = useDispatch();
  const { askLogin } = useSelector( selectAppState )

  return (
    <Modal animationType="fade" transparent={true} visible={askLogin} statusBarTranslucent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
        onPress={() => {
          dispatch( updateAppStates({
            askLogin: false
          }) )
        }}
      />
      <View
        style={[
          styles.modalView,
          {backgroundColor: COLORS.white},
        ]}>
        <Typography
          size={FONTSIZE.L}
          color={COLORS.secondary}
          align={'center'}
          style={{marginBottom: 20}}
          children={`Login Required`}
        />

        <Typography
          color={COLORS.text}
          align={'center'}
          style={{marginBottom: 10}}
          children={`Unable to perform this action in guest mode,\nplease signin or signup to continue`}
        />

        <Button label={'Login'} onPress={ () => {

          dispatch( updateUserStates({
            isGuest: false
          }) );
          
          dispatch( updateAppStates({
            askLogin: false
          }) );

        } } />

        <Button label={'Close'} backgroundColor={'#fff'} textColor={'#000'} onPress={ () => {
          dispatch( updateAppStates({
            askLogin: false
          }) );
        } } />

      </View>
    </Modal>
  );
};

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

export default AskLogin;
