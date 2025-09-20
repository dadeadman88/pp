import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {COLORS, IMAGES, screenHeight, screenWidth} from '../../constants';
import {Typography} from '../../components/atoms';
import BellIcon from '../../components/icons/BellIcon';
import {LocationIcon} from '../../components/tabIcons';
import TopUserCard from './TopUserCard';
import NearByUserCard from './NearByUserCard';
import CategoryIcon from '../../components/icons/CategoryIcon';
import UpcomingCard from './UpcomingCard';
import {navigate} from '../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {disableLoader, enableLoader} from '../../store/actions/AppActions';
import {selectAppState} from '../../store/selectors/appSelector';
import axios from 'axios';

const Home = (props: any) => {
  const dispatch = useDispatch();
  const {user, location} = useSelector(selectAppState);
  const [reload, setReload] = useState(false);
  const [banners, setBanners] = useState<any>({});

  const [data, setData] = useState({
    trending: [],
    top: [],
    nearby: [],
    events: [],
    recommended: [],
  });

  useEffect(() => {
    axios.get('banners').then(res => {
      dispatch(disableLoader());
      if (res && res.status < 300) {
        const groupedItems = res.data.response.data.reduce(
          (acc: any, item: any) => {
            const {type} = item;
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(item);
            return acc;
          },
          {},
        );
        setBanners(groupedItems);
      }
    });
  }, []);

  useEffect(() => {
    getHome(location);
  }, [reload]);

  const getHome = (latlng: any) => {
    dispatch(enableLoader());
    axios
      .get('home', {
        params: {
          lat: latlng?.latitude || '',
          lng: latlng?.longitude || '',
        },
      })
      .then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          setData({...res.data.response.data});
        }
      });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#E7F6F8',
          padding: 20,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}
          onPress={() => {
            setReload(!reload);
          }}>
          <LocationIcon width={16} color={'#000'} />
          <Typography children={'Current Location'} />
          <AdIcon name="caretdown" color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Notifications')}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            onRefresh={() => setReload(!reload)}
            refreshing={false}
          />
        }>
        <View style={styles.bannerContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Typography
                children={`Hey, ${user.name}`}
                size={24}
                capitalize={true}
              />
              <Typography
                children={'Discover Artists near you!'}
                color={COLORS.darkGray}
                size={16}
                textType="light"
              />
            </View>
            <Image
              source={user.image ? {uri: user.image_url} : IMAGES.avatar}
              style={{width: 55, height: 55, borderRadius: 40}}
            />
          </View>

          <ImageSlider images={banners.banner} />

          <SearchBar />
        </View>

        <View style={{padding: 20}}>
          <View style={styles.sectionHeader}>
            <Typography children={`Trending Photographers`} size={18} />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() =>
                navigate('UserList', {title: 'Trending Photographers'})
              }>
              <Typography children={`View All`} size={12} />
              <AdIcon name={'right'} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: 20, marginHorizontal: -20}}
            contentContainerStyle={{gap: 10, paddingHorizontal: 20}}>
            {data.trending.map((i: any) => (
              <TouchableOpacity
                style={{alignItems: 'center', gap: 8, width: 80}}
                onPress={() => navigate(`UserProfile`, {data: i})}>
                <Image
                  source={i.image ? {uri: i.image_url} : IMAGES.avatar}
                  style={{width: 60, height: 60, borderRadius: 30}}
                />
                <Typography
                  children={i.name}
                  size={12}
                  textType="light"
                  align="center"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Typography children={`Top Photographers`} size={16} />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() =>
                navigate('UserList', {title: 'Top Photographers'})
              }>
              <Typography children={`View All`} size={12} />
              <AdIcon name={'right'} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{margin: -20}}
            contentContainerStyle={styles.scrollContainerStyle}>
            {data.top.map(i => (
              <TopUserCard item={i} key={i.id} />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Typography children={`Nearby Photographers`} size={16} />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() =>
                navigate('UserList', {
                  title: 'Nearby Photographers',
                  params: {nearby: true},
                })
              }>
              <Typography children={`View All`} size={12} />
              <AdIcon name={'right'} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{margin: -20}}
            contentContainerStyle={styles.scrollContainerStyle}>
            {data.nearby.map(i => (
              <View style={{width: screenWidth(80), maxWidth: 300}}>
                <NearByUserCard item={i} />
              </View>
            ))}
          </ScrollView>

          <ImageSlider images={banners.list} />

          <View style={styles.upcomingView}>
            <View style={styles.rowGap5}>
              <Typography children={'Upcoming Bookings'} color="#fff" />
              <BellIcon color="#fff" width={16} height={16} />
            </View>
            <View style={styles.rowGap5}>
              {Array(3)
                .fill('00')
                .map(i => (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 5,
                      alignItems: 'center',
                      borderRadius: 5,
                      width: 35,
                    }}>
                    <Typography children={i} size={12} />
                    <Typography children={'Mins'} size={8} textType="light" />
                  </View>
                ))}
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{margin: -20}}
            contentContainerStyle={styles.scrollContainerStyle}>
            {data.events.map(i => (
              <UpcomingCard item={{image: IMAGES.demo2}} />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Typography children={`Recommended For You`} size={18} />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() =>
                navigate('UserList', {title: 'Recommended For You'})
              }>
              <Typography children={`View All`} size={12} />
              <AdIcon name={'right'} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{margin: -20}}
            contentContainerStyle={styles.scrollContainerStyle}>
            {data.recommended.map(i => (
              <View style={{width: screenWidth(80), maxWidth: 300}}>
                <NearByUserCard item={i} />
              </View>
            ))}
          </ScrollView>
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
  bannerContainer: {
    backgroundColor: '#E7F6F8',
    height: screenHeight(42),
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: screenWidth(89),
    height: 170,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  scrollContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  upcomingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  rowGap5: {flexDirection: 'row', gap: 5},
  // SEARCH BAR STYLING
  searchView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.11,
    shadowRadius: 4,
    elevation: 2,
  },
  allCatIcon: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.lightGray,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: '100%',
  },
});

const SearchBar = () => (
  <TouchableOpacity
    style={styles.searchView}
    activeOpacity={1}
    onPress={() => navigate('SearchScreen')}>
    <View
      style={{
        padding: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}>
      <AdIcon name="search1" color={'#fff'} size={18} />
    </View>
    <Typography
      children={'Search PictrPrfct'}
      style={{flex: 1}}
      color={COLORS.darkGray}
      textType="light"
    />
    <View style={styles.allCatIcon}>
      <CategoryIcon width={18} height={18} />
      <Typography children={'All'} color={COLORS.darkGray} textType={'light'} />
    </View>
  </TouchableOpacity>
);

const ImageSlider = ({images}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setActiveIndex(currentIndex);
  };

  return (
    <>
      <ScrollView pagingEnabled horizontal onScroll={handleScroll}>
        {images?.map((banner: any) => (
          <Image
            source={{
              uri: banner.image_url,
            }}
            style={styles.bannerImage}
          />
        ))}
      </ScrollView>
      <View
        style={{
          backgroundColor: '#000',
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 5,
          position: 'absolute',
          bottom: 20,
          right: 15,
        }}>
        <Typography
          children={`${activeIndex + 1}/${images?.length || 0}`}
          color="#fff"
          size={10}
        />
      </View>
    </>
  );
};
