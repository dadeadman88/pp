import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SafeAreaContainer from '../containers/SafeAreaContainer';
import * as Animatable from 'react-native-animatable';
import {IMAGES, screenHeight, screenWidth} from '../constants';
import {Typography} from '../components/atoms';
import {useDispatch} from 'react-redux';
import {updateAppStates} from '../store/actions/AppActions';
import {getItem} from '../utils/localStorage';
import {get} from '../store/services/Http';
import {errorHandler} from '../utils/utils';
import {ProgressBar} from '../components/atoms/ProgressBar';
// import {getCurrentLocation} from '../utils/GeoLocation';
import axios from 'axios';

const Splash = props => {
  const animRef = useRef([]);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Promise.all([
      animRef[0].fadeInDown(2000),
      animRef[1].fadeInUp(2000),
      animRef[2].fadeInDown(2000),
    ]).then(async () => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev > 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      Promise.all([
        animRef[3].fadeInLeft(2000),
        animRef[4].fadeInLeft(2000),
      ]).then(async () => {

        setTimeout(async () => {
          const userData = await getItem('@user');
          if (userData) {
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${userData.token}`;

            axios.get(`me`).then(res => {
              if (res && res.status < 300) {
                setProgress(100);
                clearInterval(progressInterval);
                dispatch(
                  updateAppStates({
                    splash: false,
                    token: userData.token,
                    user: userData,
                    role: userData.user_type,
                    authorize: true,
                  }),
                );
              } else {
                dispatch(updateAppStates({splash: false}));
              }
            });
          } else {
            dispatch(updateAppStates({splash: false}));
          }
        }, 1000);
      });
    });
  }, [animRef]);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
          }}>
          <Animatable.View
            style={{width: screenWidth(40), height: screenHeight(70), gap: 8}}
            ref={e => (animRef[0] = e)}>
            <Image
              source={IMAGES.image1}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
            <Image
              source={IMAGES.image5}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
          </Animatable.View>
          <Animatable.View
            style={{width: screenWidth(40), height: screenHeight(70), gap: 8}}
            ref={e => (animRef[1] = e)}>
            <Image
              source={IMAGES.image2}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
            <Image
              source={IMAGES.image4}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
            <Image
              source={IMAGES.image6}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
          </Animatable.View>
          <Animatable.View
            style={{width: screenWidth(40), height: screenHeight(70), gap: 8}}
            ref={e => (animRef[2] = e)}>
            <Image
              source={IMAGES.image3}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
            <Image
              source={IMAGES.image7}
              style={{flex: 1, width: '100%', resizeMode: 'cover'}}
            />
          </Animatable.View>
          <Image
            source={IMAGES.bgOverlay}
            style={{
              position: 'absolute',
              width: screenWidth(100),
              height: 200,
              bottom: -10,
            }}
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Animatable.View ref={e => (animRef[3] = e)} style={{opacity: 0}}>
            <Image
              source={IMAGES.logo}
              style={styles.splashImage}
              resizeMode={'contain'}
            />
          </Animatable.View>
          <Animatable.View
            style={{gap: 20, marginTop: 20, opacity: 0}}
            ref={e => (animRef[4] = e)}>
            <Typography
              children={`Capturing the beauty of\n your everyday life`}
              textType="semiBold"
              size={20}
              align="center"
            />
            <Typography
              children={`Compel your audience. Capture the\n moment. Light with purpose.`}
              size={12}
              align="center"
            />

            <View style={{width: 200, height: 5, alignSelf: 'center'}}>
              <ProgressBar percent={progress} />
            </View>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: screenHeight(8),
  },
});
