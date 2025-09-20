import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {Typography} from './Typography';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export const Button = props => {
  const {
    onPress,
    backgroundColor = COLORS.secondary,
    borderColor = COLORS.primary,
    label,
    borderRadius = 10,
    disabled = false,
    style = {},
    btnStyle = {},
    leftIcon = null,
    rightIcon = null,
    textColor = '#fff',
    isGradient = true,
    size = 'lg'
  } = props;

  let txtSize, btnSize;

  switch (size) {
    case 'sm':
      txtSize = 12;
      btnSize = 30;
      break;
  
    default:
      txtSize = 16;
      btnSize = 45;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      {(isGradient && !disabled) ? <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={[COLORS.secondary, COLORS.primary]}
        style={[
          btnStyle,
          styles.button,
          {
            borderRadius: borderRadius,
            borderColor: borderColor,
            height: btnSize,
          },
        ]}>
        {leftIcon && leftIcon}
        <Typography color={textColor} size={txtSize}>{`${label} `}</Typography>
        {rightIcon && rightIcon}
      </LinearGradient> : <View
        style={[
          btnStyle,
          styles.button,
          {
            backgroundColor: disabled ? '#cccccc' : backgroundColor,
            borderRadius: borderRadius,
            borderColor: borderColor,
            height: btnSize,
          },
        ]}>
        {leftIcon && leftIcon}
        <Typography color={textColor} size={txtSize}>{`${label} `}</Typography>
        {rightIcon && rightIcon}
      </View>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 5
  },
});
