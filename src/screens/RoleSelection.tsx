import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import SafeAreaContainer from '../containers/SafeAreaContainer';
import * as Animatable from 'react-native-animatable';
import {COLORS, IMAGES, screenHeight, screenWidth} from '../constants';
import {Typography} from '../components/atoms';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {updateAppStates} from '../store/actions/AppActions';
import {navigate} from '../navigation/RootNavigation';

const RoleSelection = () => {
  const dispatch = useDispatch();
  const animRef: any = useRef<any>([]);
  const [role, setRole] = React.useState<any>();

  useFocusEffect(() => {
    setRole(undefined);
    animRef[0].fadeInDown(1000);
    animRef[1].fadeInLeft(1000);
  });

  useEffect(() => {
    if (role !== undefined) {
      console.log(role);
      animRef[0].fadeOutUp(1000);
      animRef[1].fadeOutLeft(1000).then(() => {
        dispatch(updateAppStates({role}));
        navigate('Login');
      });
    }
  }, [role]);

  return (
    <SafeAreaContainer mode="dark" safeArea={false}>
      <View style={styles.container}>
        <Animatable.View
          style={{
            height: screenHeight(25),
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          ref={e => (animRef[0] = e)}>
          <View style={styles.bannerImgView}>
            <Image source={IMAGES.image1} style={styles.bannerImg} />
            <Image source={IMAGES.image5} style={styles.bannerImg} />
          </View>
          <View style={styles.bannerImgView}>
            <Image source={IMAGES.image2} style={styles.bannerImg} />
            <Image source={IMAGES.image4} style={styles.bannerImg} />
            <Image source={IMAGES.image6} style={styles.bannerImg} />
          </View>
          <View style={styles.bannerImgView}>
            <Image source={IMAGES.image3} style={styles.bannerImg} />
            <Image source={IMAGES.image7} style={styles.bannerImg} />
          </View>
          <Image
            source={IMAGES.bgOverlay}
            style={{
              position: 'absolute',
              width: screenWidth(100),
              height: 400,
              bottom: -10,
            }}
          />
        </Animatable.View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Animatable.View
            style={{
              gap: 20,
              marginTop: screenHeight(8),
              opacity: 0,
              flex: 1,
            }}
            ref={e => (animRef[1] = e)}>
            <Typography
              children={`Please Make Selection`}
              textType="semiBold"
              size={24}
              align="center"
            />
            <Typography
              children={`Lorem ipsum dolor sit amet, \nconsectetur do adipiscing elit, sed do \neiusmod tempor.`}
              size={14}
              textType="light"
              align="center"
              color={COLORS.disable}
            />

            <TouchableOpacity onPress={() => setRole(1)}>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={[COLORS.secondary, COLORS.primary]}
                style={{
                  width: screenWidth(60),
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Typography children={`Customer`} color="#fff" size={16} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRole(2)}>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={[COLORS.secondary, COLORS.primary]}
                style={{
                  width: screenWidth(60),
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Typography children={`Photographer`} color="#fff" size={16} />
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: screenHeight(8),
  },
  bannerImg: {flex: 1, width: '100%', resizeMode: 'cover'},
  bannerImgView: {width: screenWidth(40), height: screenHeight(70), gap: 8},
  rightRoleImg: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    height: 450,
    width: screenWidth(50),
    alignItems: 'center',
  },
  leftRoleImg: {
    zIndex: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    height: 450,
    width: screenWidth(50),
    alignItems: 'center',
  },
  dismissBtn: {
    position: 'absolute',
    zIndex: 5,
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  submitBtn: {
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    padding: 20,
    width: '100%',
  },
});

const RoleSelector = forwardRef(({onChange}: any, ref) => {
  const maleValue: any = useRef(new Animated.Value(0)).current;
  const femaleValue: any = useRef(new Animated.Value(0)).current;

  const [type, setType] = useState<number>();

  useImperativeHandle(ref, () => ({
    reset: () => onReset(),
  }));

  const onSelect = (role: number) => {
    setType(role);
    onChange(role);
    if (role === 2) {
      Animated.timing(maleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(femaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const onReset = () => {
    setType(undefined);
    onChange(undefined);
    Animated.timing(maleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(femaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1, width: screenWidth(100)}}>
      <Animated.View
        style={[
          styles.leftRoleImg,
          {
            zIndex: femaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 5],
            }),
            width: femaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [screenWidth(50), screenWidth(100)],
            }),
            opacity: maleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: femaleValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={() => onSelect(1)}
          style={{flex: 1}}
          activeOpacity={1}>
          {/* <Image
            source={IMAGES.female}
            style={{
              height: '100%',
              marginLeft: -25,
              width: screenWidth(92),
              resizeMode: 'contain',
            }}
          /> */}
          {!type && (
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[COLORS.secondary, COLORS.primary]}
              style={{
                position: 'absolute',
                width: screenWidth(45),
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 20,
                alignSelf: 'center',
              }}>
              <Typography children={`Customer`} color="#fff" size={16} />
            </LinearGradient>
          )}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.rightRoleImg,
          {
            zIndex: maleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 5],
            }),
            width: maleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [screenWidth(50), screenWidth(100)],
            }),
            opacity: femaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: maleValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={() => onSelect(2)}
          style={{flex: 1}}
          activeOpacity={1}>
          {/* <Image
            source={IMAGES.male}
            style={{
              height: '100%',
              marginLeft: -30,
              width: screenWidth(90),
              resizeMode: 'contain',
            }}
          /> */}
          {!type && (
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[COLORS.secondary, COLORS.primary]}
              style={{
                position: 'absolute',
                width: screenWidth(45),
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 20,
                alignSelf: 'center',
              }}>
              <Typography children={`Photographer`} color="#fff" size={16} />
            </LinearGradient>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});
