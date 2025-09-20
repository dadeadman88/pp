import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import {COLORS, IMAGES, screenHeight} from '../../constants';
import AdIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../navigation/RootNavigation';
import { disableLoader, enableLoader, resetAppStates } from '../../store/actions/AppActions';
import { removeItem } from '../../utils/localStorage';
import { selectAppState } from '../../store/selectors/appSelector';
import axios from 'axios';

const Settings = (props: any) => {

  const dispatch = useDispatch();
  const {user} = useSelector(selectAppState);

  const OPTIONS = [
    {
      title: 'Notifications',
      icon: IMAGES.notification,
      onClick: () => navigate('Notifications'),
    },
    {
      title: 'Edit Profile',
      icon: IMAGES.profile,
      onClick: () => navigate('CreateProfile', {update: true}),
    },
    ...( user.user_type == 1 ? [{
      title: 'My Favorites',
      icon: IMAGES.profile,
      onClick: () => navigate('UserList', {title: 'My Favorite', params: {
        favorite: 1
      }})
    }] : [] ),
    {
      title: 'Wallet',
      icon: IMAGES.wallet,
      onClick: () => navigate('MyWallet', {backBtn: true}),
    },
    {
      title: 'Settings',
      icon: IMAGES.settings,
      onClick: () => navigate('Advance'),
    },
    {
      title: 'Contact Us',
      icon: IMAGES.contactus,
      onClick: () => {},
    },
    {
      title: 'Logout',
      icon: IMAGES.logout,
      onClick: () => {
        Alert.alert('Confirmation', 'Are you sure, you want to logout ?', [
          {
            text: 'Yes',
            onPress: () => {
              dispatch(enableLoader());
              axios.post(`logout`)
                .then(res => {
                  dispatch(disableLoader());
                  if (res && res.status < 300) {
                    dispatch(resetAppStates());
                    removeItem('@user');
                  }
                })
                .catch(err => {
                  dispatch(disableLoader());
                  console.warn(err);
                });
            },
          },
          {
            text: 'No',
            style: 'cancel',
          },
        ]);
      },
    },
  ];

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <ImageBackground
        source={IMAGES.bgSettings}
        style={{
          maxHeight: screenHeight(40),
          paddingVertical: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={user.image ? {uri: user.image_url} : IMAGES.avatar} style={{width: 100, height: 100, borderRadius: 50}} />
        <Typography
          children={user.name}
          color="#fff"
          size={24}
          textType="semiBold"
        />
        <Typography
          children={user.email}
          color="#fff"
          size={16}
          textType="semiBold"
        />
        <Typography
          children={`No. of Bookings: 640`}
          color="#fff"
          size={16}
          textType="semiBold"
        />
      </ImageBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: 20, gap: 20}}>
        {OPTIONS.map(i => (
          <TouchableOpacity style={styles.optionView} onPress={i.onClick}>
            <Image source={i.icon} style={{width: 30, height: 30}} />
            <Typography
              children={i.title}
              size={15}
              style={{flex: 1}}
            />
            <AdIcon name={'right'} color="#000" />
          </TouchableOpacity>
        )).reduce((a, b) => (
          <>
            {a}
            <View style={{height: 1, backgroundColor: COLORS.lightGray }} />
            {b}
          </>
        ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: -20,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});
