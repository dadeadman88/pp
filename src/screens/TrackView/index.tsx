import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import { Typography } from '../../components/atoms';
import {
  COLORS,
  FONTS,
  IMAGES,
  SERVICES,
  screenHeight,
  screenWidth,
} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { LocationIcon } from '../../components/tabIcons';
import TaskIcon from '../../components/icons/TaskIcon';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppState } from '../../store/selectors/appSelector';
import { disableLoader, enableLoader } from '../../store/actions/AppActions';
import axios from 'axios';
import { errorHandler, getPlaceDetail, getPlaces } from '../../utils/utils';
import Toast from 'react-native-toast-message';
import BusinessCard from './BusinessCard';

const TrackView = () => {
  const dispatch = useDispatch();
  const mapRef = useRef<any>();

  const { location }: any = useSelector(selectAppState);
  const [reload, setReload] = useState(false);
  const [list, setList] = useState([]);
  const [type, setType] = useState<any>(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    mapRef.current.animateToRegion(
      {
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      500,
    );
  }, []);

  useEffect(() => {
    getUsers(location?.latitude, location?.longitude);
  }, [reload, type]);

  const getUsers = (lat: any, lng: any) => {
    dispatch(enableLoader());
    axios
      .get(`users`, {
        params: {
          user_type: 2,
          sortBy: 'nearby',
          categories: [],
          ...(location && { lat, lng }),
          ...(type && { categories: [SERVICES[type]].join(',') }),
        },
      })
      .then(res => {
        dispatch(disableLoader());
        if (res.status < 300) {
          console.log(res.data.response.data.length);

          setList(res.data.response.data);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(disableLoader());
        errorHandler(err);
      });
  };

  const onPredictionSelect = ({ lat, lng }: any) => {
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      500,
    );

    getUsers(lat, lng);
  };

  const onSnap = (user: any) => {
    if(user){
      mapRef.current.animateToRegion(
        {
          latitude: parseFloat(user.lat),
          longitude: parseFloat(user.lng),
          latitudeDelta: 0.005,
          longitudeDelta: 0.006,
        },
        500,
      );
    }
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}>
        <Header {...{ setType, setPlaces }} />

        {places.length > 0 && (
          <View style={styles.predictionList}>
            {places.map((pred: any) => (
              <>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => onResult(pred.place_id)}>
                  <Typography children={pred.description} />
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: COLORS.lightGray }} />
              </>
            ))}
          </View>
        )}

        <MapView
          ref={mapRef}
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {list
            .filter((i: any) => i.lat != null)
            .map((i: any, index: number) => {
              return (
                <Marker
                  key={`marker_${index}`}
                  coordinate={{
                    latitude: parseFloat(i.lat),
                    longitude: parseFloat(i.lng),
                  }}>
                  <View style={styles.customMarker}>
                    <Image
                      source={i.image ? {uri: i.image_url} : IMAGES.avatar}
                      style={styles.markerImg}
                    />
                  </View>
                </Marker>
              );
            })}

          <Marker coordinate={location}>
            <View style={styles.currentMarker}>
              <View style={styles.innerDotMarker} />
            </View>
          </Marker>
        </MapView>

        <UserSlider
          {...{
            list,
            onSnap,
          }}
        />
      </LinearGradient>
    </SafeAreaContainer>
  );
};

export default TrackView;

const Header = ({ setType, setPlaces }: any) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setType(active != 0 ? active : null);
  }, [active]);

  useEffect(() => {
    if (search.length == 0) setPlaces([]);
    const inteval = setTimeout(() => {
      if (search.length < 3) return;
      dispatch(enableLoader());
      getPlaces(search)
        .then((result: any) => {
          dispatch(disableLoader());
          setPlaces(result.predictions);
        })
        .catch(err => {
          dispatch(disableLoader());
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        });
    }, 1000);
    return () => {
      clearTimeout(inteval);
    };
  }, [search]);


  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.searchView}>
          <LocationIcon color={COLORS.primary} width={20} height={20} />
          <TextInput
            placeholder="Search Location"
            placeholderTextColor={COLORS.darkGray}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <AdIcon name={'closecircleo'} color={COLORS.darkGray} size={16} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.searchIcon}>
          <TaskIcon />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -20 }}
        contentContainerStyle={{ gap: 10, marginTop: 20, paddingHorizontal: 20 }}>
        {['All', ...SERVICES].map((i, index) => (
          <TouchableOpacity
            key={`services_${index}`}
            style={index == active ? styles.activeCat : styles.regularCat}
            onPress={() => setActive(index)}>
            <Typography
              children={i}
              color={index == active ? '#fff' : '#C3E6E2'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

const UserSlider = ({list, onSnap}: any) => {
  const scrollEndTimeout = useRef<any>(null);

  const onMomentumScrollEnd = (event: any) => {
    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current);
    }

    const pageNumber = Math.floor(event.nativeEvent.contentOffset.x / 300);
    scrollEndTimeout.current = setTimeout(() => {
      onSnap(list[pageNumber]);
    }, 100);
  };

  return (
    <ScrollView
      onMomentumScrollEnd={onMomentumScrollEnd}
      horizontal
      pagingEnabled
      decelerationRate={'fast'}
      snapToInterval={322}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 20
      }}
      style={{
        position: 'absolute',
        bottom: 10,
      }}>
      {list.map((i: any, index: number) => (
        <BusinessCard item={i} key={`user_${index} `} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activeCat: {
    backgroundColor: '#ffffff33',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  regularCat: { paddingHorizontal: 10, paddingVertical: 5 },
  searchView: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    fontFamily: FONTS.PoppinsRegular,
    color: COLORS.text,
  },
  searchIcon: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginLeft: 10,
  },
  predictionList: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: screenHeight(21),
    zIndex: 99999,
    alignSelf: 'center',
    width: screenWidth(90),
    borderRadius: 10,
  },
  customMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerImg: {
    width: 29,
    height: 29,
    backgroundColor: '#12A3BD',
    borderRadius: 15,
    overflow: 'visible',
  },
  currentMarker: {
    width: 40,
    height: 40,
    backgroundColor: '#12A3BD55',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDotMarker: {
    width: 15,
    height: 15,
    backgroundColor: '#12A3BD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
