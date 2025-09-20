import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import SafeAreaContainer from '../../../containers/SafeAreaContainer';
import {Typography} from '../../../components/atoms';
import {IMAGES, screenHeight} from '../../../constants';
import {ImageBackground} from 'react-native';
import BookingCard from '../../BookingHistory/BookingCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectAppState, selectUserState} from '../../../store/selectors/appSelector';
import {getCurrentLocation} from '../../../utils/GeoLocation';
import {updateUserStates} from '../../../store/actions/UserActions';
import {updateUserApi} from '../../../store/services/services';
import {errorHandler} from '../../../utils/utils';
import axios from 'axios';

const Home = (props: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector(selectAppState);

  useEffect(() => {
    getCurrentLocation().then((res: any) => {
      if (res.latitude) {
        dispatch(updateUserStates({location: res}));
        axios.post(`users/${user.id}`, {
          '_method': 'PATCH',
          'lat': res.latitude,
          'lng': res.longitude
        }).then(res => {
          if (res && res.status < 300) {}
        });
      }
    });
  }, []);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground source={IMAGES.bgSettings} style={styles.scrollHeader}>
          <Image
            source={user.image ? {uri: user.image_url} : IMAGES.avatar}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Typography children={`Good Morning`} color="#fff" size={16} />
          <Typography
            children={user.name}
            color="#fff"
            size={24}
            textType="semiBold"
          />
          {user.about && (
            <Typography
              children={user.about}
              color="#fff"
              size={13}
              textType="light"
              align="center"
            />
          )}
        </ImageBackground>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: -30,
            borderRadius: 20,
            padding: 20,
            gap: 10,
          }}>
          <BookingCard editable={true} item={{status: 'pending'}} key={1} />
          <BookingCard editable={true} item={{status: 'accepted'}} key={2} />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollHeader: {
    minHeight: screenHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});
