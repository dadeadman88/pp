import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../constants';
import {Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {onBack} from '../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  disableLoader,
  enableLoader,
  updateAppStates,
} from '../store/actions/AppActions';
import SafeAreaContainer from '../containers/SafeAreaContainer';
import {setItem} from '../utils/localStorage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { selectAppState } from '../store/selectors/appSelector';

const Verification = (props: any) => {
  const dispatch = useDispatch();
  const pinRef: any = React.useRef([]);
  const {role} = useSelector(selectAppState);
  const {redirectTo, data} = props.route?.params || {};
  const [enableResend, setEnableResend] = React.useState(false);
  const [pin, setPin] = React.useState(Array(4).fill(''));

  const sendCode = () => {
    dispatch(enableLoader());
    axios.post(`code/send`, data).then(res => {
      dispatch(disableLoader());
      if (res.status < 300) {
        Toast.show({
          type: 'success',
          text1: res.data.response.messages[0],
        });
      }
    });
  };

  const onSubmit = React.useCallback(() => {
    dispatch(enableLoader());
    axios
      .post(`code/verify`, {
        ...data,
        code: pin.join(''),
      })
      .then(res => {
        dispatch(disableLoader());
        if (res.status < 300) {
          Toast.show({
            type: 'success',
            text1: res.data.response.messages[0],
          });

          if (redirectTo) {
            onVerification();
          } else {
            let userData = res.data.response.data;
            setItem('@user', userData);
            dispatch(
              updateAppStates({
                token: userData.token,
                user: userData,
                role: userData.user_type,
                defaultRoute: 'index',
              }),
            );
          }
        }
      });
  }, [pin]);

  const onVerification = () => {
    console.log(role);
    
    dispatch(enableLoader());
    axios
      .post(`register`, {
        ...data,
        user_type: role,
      })
      .then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          let userData = res.data.response.data;
          let defaultRoute = 'Home';
          if (userData.user_type == 2 && redirectTo) {
            defaultRoute = redirectTo;
          }

          setItem('@user', userData);
          dispatch(
            updateAppStates({
              token: userData.token,
              user: userData,
              role: userData.user_type,
              defaultRoute: defaultRoute,
              authorize: true
            }),
          );
        }
      });
  };

  return (
    <SafeAreaContainer style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            children={`Enter 4 Digits Code`}
            textType="semiBold"
            size={24}
          />
          <Typography
            children={`Please enter the verification code, sent to your email address ***`}
            size={14}
            textType="light"
            color={COLORS.disable}
          />

          <View style={{gap: 20, marginTop: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
              {pin.map((_, i) => (
                <TextInput
                  key={i}
                  ref={e => (pinRef[i] = e)}
                  keyboardType="number-pad"
                  placeholder="-"
                  placeholderTextColor={COLORS.darkGray}
                  value={pin[i]}
                  maxLength={1}
                  textAlign="center"
                  onKeyPress={(e: any) => {
                    if (e.nativeEvent.key >= 0 && e.nativeEvent.key <= 9) {
                      pin[i] = e.nativeEvent.key;
                      setPin([...pin]);
                      if (pinRef[i + 1]) pinRef[i + 1].focus();
                    } else if (e.nativeEvent.key == 'Backspace') {
                      if (pin[i] == '') {
                        pin[i - 1] = '';
                        setPin([...pin]);
                        if (pinRef[i - 1]) pinRef[i - 1].focus();
                      } else {
                        pin[i] = '';
                        setPin([...pin]);
                        if (pinRef[i + 1]) pinRef[i + 1].focus();
                      }
                    }
                  }}
                  style={styles.pinInput}
                />
              ))}
            </View>

            <Button
              label={'Submit'}
              disabled={pin.filter(i => i !== '').length < 4}
              onPress={onSubmit}
            />

            {!enableResend ? (
              <Timer onFinished={() => setEnableResend(true)} />
            ) : (
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  sendCode();
                  setEnableResend(false);
                }}>
                <Typography children={`Resend Code`} />
              </TouchableOpacity>
            )}
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default Verification;

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
  pinInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    width: 60,
    height: 60,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: COLORS.text,
    fontSize: 20,
    fontFamily: FONTS.PoppinsRegular,
  },
});

const Timer = ({onFinished}: any) => {
  const [timer, setTimer] = React.useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) {
          onFinished && onFinished();
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Typography children={`00:${timer}`} align="center" />;
};
