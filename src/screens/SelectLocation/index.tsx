import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {InputText, Typography} from '../../components/atoms';
import {COLORS, FONTS} from '../../constants';
import {Button} from '../../components/atoms/Button';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import MapView from 'react-native-maps';
import FeIcon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { navigate } from '../../navigation/RootNavigation';

const SelectLocation = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader
        color={COLORS.text}
        title={'Select Location'}
        fixed={true}
      />
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 40.58523590720527,
          longitude: -73.97001712073414,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          padding: 20,
          top: 80,
        }}>
        <InputText
          leftIcon={<FeIcon name={'search'} color={'#1D2733'} size={20} />}
          rightIcon={<MatIcon name={'my-location'} color={COLORS.primary} size={20} />}
          placeholder={'Search a place here...'}
          style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: 0.5, borderColor: COLORS.lightGray}}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          padding: 20,
          bottom: 10,
        }}>
        <Button label={'Continue'} onPress={()=>navigate('BookingSummary')} />
      </View>
    </SafeAreaContainer>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
