import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import SafeAreaContainer from '../containers/SafeAreaContainer';
import {COLORS} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {ImageHeader} from './Login';
import {InputDateTime} from '../components/atoms/InputDateTime';
import {navigate} from '../navigation/RootNavigation';
import {validate} from '../utils/Validator';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {disableLoader, enableLoader} from '../store/actions/AppActions';
import Toast from 'react-native-toast-message';

const Signup = (props: any) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
  });

  const onSubmit = () => {
    validate(formFields).then(err => {
      if (err) {
        setErrors(err);
        return;
      }

      dispatch(enableLoader());
      axios.post(`code/send`, formFields).then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          Toast.show({
            type: 'success',
            text1: res.data.response.messages[0],
          });

          navigate('Verification', {
            redirectTo: 'CreateProfile',
            data: formFields,
          });
        }
      });
    });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <ImageHeader />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              gap: 10,
              paddingTop: 0,
              padding: 20,
            }}>
            <Typography
              children={`Create an account`}
              textType="semiBold"
              size={24}
              align="center"
            />
            <Typography
              children={`Please enter your details here`}
              size={14}
              textType="light"
              align="center"
              color={COLORS.disable}
            />

            <View style={{gap: 30, marginTop: 20}}>
              <InputText
                leftIcon={<FeIcon name="mail" color={'#1D2733'} size={18} />}
                placeholder={'Enter you name'}
                value={formFields.name}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, name: txt})
                }
                error={errors.name}
              />
              <InputText
                leftIcon={<FeIcon name="mail" color={'#1D2733'} size={18} />}
                placeholder={'Enter you email'}
                keyboardType={'email-address'}
                value={formFields.email}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, email: txt})
                }
                error={errors.email}
              />
              <InputText
                leftIcon={<FeIcon name="phone" color={'#1D2733'} size={18} />}
                placeholder={'Enter you phone'}
                value={formFields.phone}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, phone: txt})
                }
                error={errors.phone}
                inputProps={{
                  keyboardType: 'phone-pad',
                }}
              />
              <InputDateTime
                leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
                placeholder={'Select your date of birth'}
                value={formFields.dob}
                onChange={(txt: string) =>
                  setFormFields({...formFields, dob: txt})
                }
                error={errors.dob}
              />
              <InputText
                leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
                placeholder={'Enter you password'}
                secureTextEntry={true}
                value={formFields.password}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, password: txt})
                }
                error={errors.password}
              />
              <Button label={'Sign Up'} onPress={onSubmit} />

              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View
                  style={{height: 1, flex: 1, backgroundColor: COLORS.darkGray}}
                />
                <Typography
                  children={`Or Continue with`}
                  color={COLORS.darkGray}
                />
                <View
                  style={{height: 1, flex: 1, backgroundColor: COLORS.darkGray}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography align="center">
                  Already have any account?{' '}
                </Typography>
                <TouchableOpacity onPress={() => navigate('Login')}>
                  <Typography
                    children={`Sign In`}
                    style={{textDecorationLine: 'underline'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
