import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FeIcon from 'react-native-vector-icons/Feather';
import {COLORS, IMAGES, screenHeight, screenWidth} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {navigate, onBack} from '../navigation/RootNavigation';
import {validate} from '../utils/Validator';
import {post} from '../store/services/Http';
import {useDispatch} from 'react-redux';
import {
  disableLoader,
  enableLoader,
  showToast,
} from '../store/actions/AppActions';
import {errorHandler} from '../utils/utils';

const Forgot = (props: any) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');

  const onForgot = () => {
    validate({email}).then(err => {
      if (err) {
        setErrors(err);
        return;
      }

      dispatch(enableLoader());
      post(`forgot-password`, JSON.stringify({email})).then((res: any) => {
        dispatch(disableLoader());
        if ('response' in res && res.response.code === 200) {
          dispatch(showToast(res.response?.messages[0]));
          setEmail('');
          navigate('Verification', {data: {phone: email}});
        } else {
          errorHandler(res);
        }
      });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => onBack()}
      />
      <Animatable.View
        style={styles.bottomCard}
        animation={'fadeInUp'}
        duration={500}>
        <Typography
          children={`Forgot password`}
          textType="semiBold"
          size={24}
        />
        <Typography
          children={`Enter your email for the verification process, we will send 4 digits code to your email.`}
          size={14}
          textType="light"
          color={COLORS.disable}
        />
        <View style={{gap: 30, marginTop: 20}}>
          <InputText
            leftIcon={<FeIcon name="mail" color={'#1D2733'} size={18} />}
            placeholder={'Enter you email'}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <Button label={'Submit'} onPress={onForgot} />
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'flex-end',
  },
  bottomCard: {
    backgroundColor: '#fff',
    gap: 10,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
