import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FeIcon from 'react-native-vector-icons/Feather';
import SafeAreaContainer from '../containers/SafeAreaContainer';
import {COLORS, IMAGES, screenHeight, screenWidth} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {navigate} from '../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {disableLoader, enableLoader, updateAppStates} from '../store/actions/AppActions';
import {setItem} from '../utils/localStorage';
import {validate} from '../utils/Validator';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    validate(formFields).then(err => {
      if (err) {
        setErrors(err);
        return;
      }

      dispatch(enableLoader());
      axios.post(`login`, formFields).then((res: any) => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          let userData = res.data.response.data;

          let defaultRoute = 'Tabs';
          if (userData.user_type === 2) {
            if (
              !userData.portfolio ||
              !userData.about ||
              !userData.max_rate ||
              !userData.min_rate
            ) {
              defaultRoute = 'CreateProfile';
            } else if (userData.addresses.length === 0) {
              defaultRoute = 'AddressForm';
            }
          }

          setItem('@user', userData);
          dispatch(
            updateAppStates({
              user: userData,
              token: userData.token,
              role: userData.user_type,
              defaultRoute,
              authorize: true
            }),
          );
        }
      }).catch(err => console.log(err));
    });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <ImageHeader />
          <View
            style={{flex: 1, backgroundColor: '#fff', gap: 10, padding: 20}}>
            <Typography
              children={`Welcome to PicturePrfct!`}
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
                placeholder={'Enter you email'}
                value={formFields.email}
                error={errors.email}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, email: txt})
                }
              />
              <InputText
                leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
                placeholder={'Enter you password'}
                secureTextEntry={true}
                error={errors.password}
                value={formFields.password}
                onChangeText={(txt: string) =>
                  setFormFields({...formFields, password: txt})
                }
              />
              <TouchableOpacity
                onPress={() => navigate('Forgot')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-end',
                }}>
                <FeIcon name={'help-circle'} color={'#1D2733'} size={18} />
                <Typography>Forgot Password ?</Typography>
              </TouchableOpacity>
              <Button label={'Sign In'} onPress={onSubmit} />

              <View style={{gap: 8}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <View
                    style={{
                      height: 1,
                      flex: 1,
                      backgroundColor: COLORS.darkGray,
                    }}
                  />
                  <Typography
                    children={`Or Continue with`}
                    color={COLORS.darkGray}
                  />
                  <View
                    style={{
                      height: 1,
                      flex: 1,
                      backgroundColor: COLORS.darkGray,
                    }}
                  />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Image
                    source={IMAGES.googleIcon}
                    style={{height: 70, width: 70}}
                  />
                  {Platform.OS === 'ios' && (
                    <Image
                      source={IMAGES.appleIcon}
                      style={{height: 70, width: 70}}
                    />
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    justifyContent: 'center',
                  }}>
                  <Typography align="center">Dont have any account?</Typography>
                  <TouchableOpacity onPress={() => navigate('Signup')}>
                    <Typography
                      children={`Sign Up`}
                      style={{textDecorationLine: 'underline'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImg: {flex: 1, width: '100%', resizeMode: 'cover'},
  bannerImgView: {width: screenWidth(40), height: screenHeight(70), gap: 8},
});

export const ImageHeader = () => (
  <Animatable.View
    style={{
      height: screenHeight(30),
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'center',
      alignItems: 'flex-end',
    }}
    animation={'fadeInUp'}
    // animation={'fadeInDown'}
    duration={1000}>
    <View
      style={{
        ...styles.bannerImgView,
        top: 80,
      }}>
      <Image source={IMAGES.image1} style={styles.bannerImg} />
      <Image source={IMAGES.image5} style={styles.bannerImg} />
    </View>
    <View
      style={{
        ...styles.bannerImgView,
        top: 100,
      }}>
      <Image source={IMAGES.image2} style={styles.bannerImg} />
      <Image source={IMAGES.image4} style={styles.bannerImg} />
      <Image source={IMAGES.image6} style={styles.bannerImg} />
    </View>
    <View
      style={{
        ...styles.bannerImgView,
        top: 80,
      }}>
      <Image source={IMAGES.image3} style={styles.bannerImg} />
      <Image source={IMAGES.image7} style={styles.bannerImg} />
    </View>
    <Image
      source={IMAGES.bgOverlay}
      style={{
        position: 'absolute',
        width: screenWidth(100),
        height: 300,
        bottom: -10,
      }}
    />
  </Animatable.View>
);
