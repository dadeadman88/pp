import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, screenHeight} from '../constants';
import {InputText, Typography} from '../components/atoms';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {navigate, onBack} from '../navigation/RootNavigation';
import {
  disableLoader,
  enableLoader,
  updateAppStates,
} from '../store/actions/AppActions';
import {getGeocode} from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {selectAppState} from '../store/selectors/appSelector';
import {getCurrentLocation} from '../utils/GeoLocation';
import axios from 'axios';

const AddressForm = () => {
  const dispatch = useDispatch();
  const cord = useRef<any>();
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const {addresses} = useSelector(selectAppState);
  const [fields, setFields] = useState({
    address: '',
    street: '',
    area: '',
    floor: '',
  });

  useEffect(() => {
    getLocation();
  }, []);

  const heightValue = new Animated.Value(0);
  const maxHeight = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight(80) - 20, screenHeight(55) - 20],
  });

  const handleSheetChange = (e: number) => {
    if (!e) {
      Animated.timing(heightValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const onSubmit = () => {
    dispatch(enableLoader());
    axios.post(`addresses`, fields).then((res: any) => {
      console.log(res);
      dispatch(disableLoader());
      if (res && res.status < 300) {
        dispatch(
          updateAppStates({
            addresses: [...addresses, res.data.response.data],
            defaultRoute: 'index',
          }),
        );
        navigate('Started');
      }
    });
  };

  const getLocation = () => {
    getCurrentLocation().then((res: any) => {
      mapRef.current.animateToRegion(
        {
          latitude: res.latitude,
          longitude: res.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        500,
      );

      getAddress(res);
    });
  };

  const getAddress = (location = null) => {
    const {latitude, longitude} = location || cord.current;
    
    getGeocode(latitude, longitude).then((place: any) => {
      bottomSheetRef.current?.expand();
      console.log(place.results);
      
      // setFields({
      //   ...fields,
      //   address: place.results[0].formatted_address,
      // });
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={{flex: 1, maxHeight: screenHeight(80) - 20}}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            onRegionChange={region => {
              markerRef.current.setNativeProps({coordinate: region});
            }}
            onRegionChangeComplete={region => {
              cord.current = region;
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              ref={markerRef}
              draggable={true}
              coordinate={{
                latitude: 0,
                longitude: 0,
              }}
            />
          </MapView>
          <TouchableOpacity style={styles.closeIcon} onPress={() => onBack()}>
            <MiIcon name={'close'} color={'#00000088'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.myLocationIcon} onPress={getLocation}>
            <MiIcon name={'my-location'} color={'#00000088'} size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pickLocationBtn} onPress={() => getAddress()}>
            <Typography children={'Pick Location'} />
          </TouchableOpacity>
        </Animated.View>
        <BottomSheet
          enableDynamicSizing={false}
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onAnimate={handleSheetChange}>
          <View style={styles.bottomCard}>
            <View style={styles.cardHeader}>
              <TouchableOpacity onPress={() => onBack()}>
                <Typography
                  children={`Cancel`}
                  textType="light"
                  size={12}
                  color={COLORS.lightRed}
                />
              </TouchableOpacity>
              <Typography
                children={`Enter Address`}
                textType="semiBold"
                size={18}
              />
              <TouchableOpacity onPress={onSubmit}>
                <Typography
                  children={`Save`}
                  textType="light"
                  size={12}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{gap: 20, marginTop: 20}}>
              <InputText
                rightIcon={
                  <MiIcon name={'my-location'} color={'#00000066'} size={18} />
                }
                placeholder={'Address'}
                value={fields.address}
                onChangeText={(txt: string) =>
                  setFields({...fields, address: txt})
                }
                onFocus={() => {
                  bottomSheetRef.current?.expand();
                }}
              />
              <InputText
                placeholder={'Street'}
                value={fields.street}
                onChangeText={(txt: string) =>
                  setFields({...fields, street: txt})
                }
              />
              <InputText
                placeholder={'Area/Building'}
                value={fields.area}
                onChangeText={(txt: string) =>
                  setFields({...fields, area: txt})
                }
              />
              <InputText
                placeholder={'Floor/Unit (Optional)'}
                value={fields.floor}
                onChangeText={(txt: string) =>
                  setFields({...fields, floor: txt})
                }
              />
            </ScrollView>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000011',
    justifyContent: 'flex-end',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 20,
  },
  bottomCard: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeIcon: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 25,
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 99,
  },
  myLocationIcon: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 99,
  },
  pickLocationBtn: {
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    zIndex: 99,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00000088',
  },
});
