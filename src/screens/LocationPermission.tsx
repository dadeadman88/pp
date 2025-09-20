import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FeIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, IMAGES, screenHeight, screenWidth} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {navigate, onBack, replace} from '../navigation/RootNavigation';

const LocationPermission = (props: any) => {
  const pinRef: any = React.useRef([]);

  const [enableResend, setEnableResend] = React.useState(false);
  const [pin, setPin] = React.useState(Array(4).fill(''));

  return (
    <View style={styles.container}>
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
          children={`Find Photographer near your location!`}
          textType="semiBold"
          size={24}
        />
        <Typography
          children={`Please allow app access to your location to find Camel near you. `}
          size={14}
          textType="light"
          color={COLORS.disable}
        />

        <Button label={'Yes, Allow'} onPress={ () => replace('Started') } />
        <Button label={`Don't, Allow`} onPress={ () => replace('Started') } />
      </Animatable.View>
    </View>
  );
};

export default LocationPermission;

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