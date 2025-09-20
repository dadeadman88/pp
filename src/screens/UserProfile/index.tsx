import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import {COLORS, IMAGES, screenHeight} from '../../constants';
import {RatingStars} from '../../components/atoms/RatingStars';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {ProgressBar} from '../../components/atoms/ProgressBar';
import {LocationIcon} from '../../components/tabIcons';
import StarIcon from '../../components/icons/StarIcon';
import DangerIcon from '../../components/icons/DangerIcon';
import SlashIcon from '../../components/icons/SlashIcon';
import ReportModal from '../../components/atoms/ReportModal';
import {navigate} from '../../navigation/RootNavigation';
import {FloatBackBtn} from '../../components/atoms/FloatBackBtn';
import {ImageList} from './ImageList';
import {post} from '../../store/services/Http';
import {useDispatch} from 'react-redux';
import {
  disableLoader,
  enableLoader,
  showToast,
} from '../../store/actions/AppActions';
import {errorHandler} from '../../utils/utils';
import MapView, {Marker} from 'react-native-maps';

const UserProfile = (props: any) => {
  const dispatch = useDispatch();
  const {data} = props.route.params || {};
  const reportRef = useRef<any>();
  const [user, setUser] = useState(data);

  const onFavorite = () => {
    dispatch(enableLoader());
    post(`favorites`, JSON.stringify({user_id: user.id})).then((res: any) => {
      dispatch(disableLoader());
      if ('response' in res) {
        setUser({
          ...user,
          ...res.response.data,
        });
      } else {
        errorHandler(res);
      }
    });
  };

  const onBlock = () => {
    dispatch(enableLoader());
    post(`blocks`, JSON.stringify({user_id: user.id})).then((res: any) => {
      dispatch(disableLoader());
      if ('response' in res) {
        setUser({});
        dispatch(showToast(res.response.messages[0]));
      } else {
        errorHandler(res);
      }
    });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: screenHeight(50)}}>
          <FloatBackBtn />

          <Image
            source={user?.image ? {uri: user.image_url} : IMAGES.avatar}
            style={{flex: 1, width: '100%', resizeMode: 'cover'}}
          />
          <TouchableOpacity
            onPress={() => navigate('CreateBooking')}
            style={{
              backgroundColor: '#44B093',
              position: 'absolute',
              bottom: 50,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              paddingRight: 20,
              borderTopStartRadius: 20,
              borderBottomStartRadius: 20,
              gap: 10,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <AdIcon name={'left'} color={'#000'} />
            </View>
            <Typography children={`Book Now`} color="#fff" size={16} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: -20,
            borderRadius: 20,
            padding: 20,
          }}>
          <Typography children={user.name} size={24} textType="semiBold" />
          <Typography children={user.country || '-'} textType="light" />
          <RatingStars />

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 8,
            }}>
            {user.services?.map((i: any, index: number) => (
              <View
                style={[
                  styles.profileBadge,
                  {
                    backgroundColor:
                      index % 2 ? COLORS.secondary : COLORS.primary,
                  },
                ]}
                key={index}>
                <Typography children={i.service} color="#fff" size={12} />
              </View>
            ))}
          </View>

          <View style={styles.pricing}>
            <Typography
              children={
                user.portfolio != 'null'
                  ? user.portfolio || 'Not Available'
                  : 'N/A'
              }
              color="#12A3BD"
            />
            <Typography
              children={`$${user.min_rate || 0} / hr`}
            />
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={styles.socialCard}>
              <Typography children={'196'} size={18} textType="bold" />
              <Typography
                children={'Photos'}
                size={12}
                color={COLORS.darkGray}
                textType="regular"
              />
            </View>
            <View style={styles.socialCard}>
              <Typography children={'123'} size={18} textType="bold" />
              <Typography
                children={'Event'}
                size={12}
                color={COLORS.darkGray}
                textType="regular"
              />
            </View>

            <View style={styles.socialCard}>
              <Typography children={'2.9K'} size={18} textType="bold" />
              <Typography
                children={'Feedback'}
                size={12}
                color={COLORS.darkGray}
                textType="regular"
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Typography
              children={`About ${user.name}`}
              size={18}
              textType="bold"
              style={{textTransform: 'capitalize'}}
            />
            <Typography
              color="#939393"
              style={{lineHeight: 20, marginTop: 10}}
              children={user.about || '-'}
            />
          </View>

          <RowHeader
            title={'Photos & Videos'}
            onViewAll={() =>
              navigate('FileList', {
                media: user.gallery,
              })
            }
          />
          <ImageList data={user.gallery || []} />

          <RowHeader title={'Rating and Reviews'} hideViewAll={true} />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
              }}>
              <Typography children={4.5} size={38} textType="semiBold" />
              <RatingStars label={null} />
            </View>
            <View
              style={{
                flex: 1,
                gap: 10,
                borderLeftWidth: 2,
                borderLeftColor: COLORS.lightGray,
                paddingLeft: 10,
              }}>
              <ProgressBar percent={20} />
              <ProgressBar percent={40} />
              <ProgressBar percent={10} />
              <ProgressBar percent={90} />
              <ProgressBar percent={10} />
              <Typography children={`128 Ratings`} size={10} align={'right'} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.lightGray,
              marginTop: 20,
            }}>
            <Typography children={`See all reviews`} textType="semiBold" />
            <AdIcon name={'right'} color="#000" />
          </View>

          {user?.addresses && user?.addresses?.length != 0 && (
            <>
              <RowHeader title={'Address'} hideViewAll={true} />
              <View style={{flexDirection: 'row', gap: 5}}>
                <LocationIcon color={COLORS.primary} width={18} height={18} />
                <Typography
                  children={user?.addresses[0]?.address || 'Not Available'}
                  color={COLORS.darkGray}
                  textType="light"
                  style={{flex: 1}}
                />
              </View>
            </>
          )}

          <View
            style={{
              width: '100%',
              height: 200,
              borderRadius: 20,
              marginVertical: 10,
              overflow: 'hidden',
            }}>
            <MapView
              scrollEnabled={false}
              style={{flex: 1}}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
              />
            </MapView>
          </View>

          <View style={styles.profileActionBtn}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={onFavorite}>
              <StarIcon
                {...(user.is_liked && {fill: '#ffa534', stroke: '#ffa534'})}
              />
              <Typography children={`Favorite`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                reportRef.current.open({
                  title: 'Report',
                  options: [
                    'Harrasment',
                    'Fake Profile',
                    'Fake Content',
                    'Policy Voilence',
                  ],
                });
              }}>
              <DangerIcon />
              <Typography children={`Report`} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={onBlock}>
              <SlashIcon />
              <Typography children={`Block`} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ReportModal ref={reportRef} data={user} />
    </SafeAreaContainer>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  socialCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  pricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  profileActionBtn: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
});

const RowHeader = ({title, hideViewAll = false, onViewAll = () => {}}: any) => (
  <View style={styles.sectionHeader}>
    <Typography children={title} size={18} textType="semiBold" />
    {!hideViewAll && (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
        onPress={onViewAll}>
        <Typography children={`View All`} size={12} />
        <AdIcon name={'right'} color="#000" />
      </TouchableOpacity>
    )}
  </View>
);
