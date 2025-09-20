import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FeIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, IMAGES, screenHeight, screenWidth} from '../constants';
import {InputText, Typography} from '../components/atoms';
import {Button} from '../components/atoms/Button';
import {navigate, onBack, replace, reset} from '../navigation/RootNavigation';

const Started = (props: any) => {
  const pinRef: any = React.useRef([]);

  const [enableResend, setEnableResend] = React.useState(false);
  const [pin, setPin] = React.useState(Array(4).fill(''));

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          flex: 1,
        }}
      /> */}
      <Animatable.View
        style={styles.bottomCard}
        animation={'fadeInUp'}
        duration={500}>
        <Typography
          children={`Lorem Ipsum is simply dummy of printing.`}
          textType="semiBold"
          size={24}
        />
        <Typography
          children={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.`}
          size={14}
          textType="light"
          color={COLORS.disable}
        />
        <Button label={'Get Started'} onPress={ () => reset('Tabs') } />
      </Animatable.View>
    </View>
  );
};

export default Started;

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