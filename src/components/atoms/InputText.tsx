import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONTS, FONTSIZE} from '../../constants';
import {Typography} from './Typography';
import {commonStyles} from '../../style';
import {capitalize} from '../../utils/utils';
import FeIcon from 'react-native-vector-icons/Feather';

export const InputText = (props: any) => {
  const {
    label = null,
    labelColor = '#707070',
    error = '',
    errorColor = COLORS.lightRed,
    placeholder,
    placeholderColor = COLORS.darkGray,
    textColor = COLORS.text,
    onChangeText = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyPress = () => {},
    value,
    autoCapitalize = 'none',
    keyboardType = 'default',
    returnKeyType = 'done',
    inputRef = input => {},
    onSubmitEditing = () => {},
    secureTextEntry = false,
    autoFocus = false,
    maxLength = 100,
    style = {},
    cardStyle = {},
    leftIcon = null,
    rightIcon = null,
    multiline = false,
    editable = true,
    inputProps = {}
  } = props;

  const [secureText, setSecureText] = React.useState(true);

  return (
    <View style={{gap: 8, ...style}}>
      {label && (
        <Typography size={12} color={labelColor} textType={'light'}>
          {label}
        </Typography>
      )}
      <View style={[commonStyles.inputView, cardStyle]}>
        {leftIcon}
        <TextInput
          style={{
            fontSize: FONTSIZE.S,
            fontFamily: FONTS.PoppinsRegular,
            flex: 1,
            color: textColor,
            padding: 8,
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          onKeyPress={onKeyPress}
          value={value}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          blurOnSubmit={false}
          maxLength={maxLength}
          ref={inputRef}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry && secureText}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={multiline}
          editable={editable}
          {...inputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.secureIcon}>
            <FeIcon name={secureText ? "eye-off" : "eye"} color={'#000'} size={16} />
          </TouchableOpacity>
        )}
        {rightIcon}
      </View>
      {error != '' && (
        <Typography color={errorColor} size={12} textType="light" align="right">
          {capitalize(error)}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  secureIcon: {width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}
});