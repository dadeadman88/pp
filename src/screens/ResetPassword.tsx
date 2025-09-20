import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FeIcon from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {reset} from '../navigation/RootNavigation';
import {validate} from '../utils/Validator';
import {useDispatch, useSelector} from 'react-redux';
import {
  disableLoader,
  enableLoader,
  updateAppStates,
} from '../store/actions/AppActions';
import {setItem} from '../utils/localStorage';
import {selectAppState} from '../store/selectors/appSelector';
import axios from 'axios';

const ResetPassword = (props: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector(selectAppState);

  const [errors, setErrors] = useState<any>({});
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSubmit = () => {
    validate({password, confirm}, 'reset').then(err => {
      if (err) {
        setErrors(err);
        return;
      }

      dispatch(enableLoader());
      axios.post(`reset-password`, {password}).then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          let userData = res.data.response.data;
          setItem('@user', {...user, ...userData});
          dispatch(
            updateAppStates({
              user: {...user, ...userData},
            }),
          );
          reset('Tabs');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        style={styles.bottomCard}
        animation={'fadeInUp'}
        duration={500}>
        <Typography children={`Reset Password`} textType="semiBold" size={24} />
        <Typography
          children={`Set the new password for your account so you can login and access all the features.`}
          size={14}
          textType="light"
          color={COLORS.disable}
        />
        <View style={{gap: 30, marginTop: 20}}>
          <InputText
            leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
            placeholder={'Enter you new password'}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <InputText
            leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
            placeholder={'Confirm you passwrd'}
            secureTextEntry={true}
            value={confirm}
            onChangeText={setConfirm}
            error={errors.confirm}
          />
          <Button label={'Submit'} onPress={() => onSubmit()} />
        </View>
      </Animatable.View>
    </View>
  );
};

export default ResetPassword;

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
