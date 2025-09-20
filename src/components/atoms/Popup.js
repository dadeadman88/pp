import React, {useContext, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import {COLORS} from '../../constants';
import {ThemeContext} from '../../context';
import {Typography} from './Typography';
const {width} = Dimensions.get('window');

const Popup = props => {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    visible,
    title,
    optionOne,
    optionTwo,
    onPressOne = () => {},
    onPressTwo = () => {},
    mainViewStyles,
    modalBodyStyles,
    modalView,
    twoOptions = true,
    inputType = false,
    placeholder = 'Enter Title',
    onChangeText = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onSubmitEditing = () => {},
    secureTextEntry = false,
    autoFocus = () => {},
    value = '',
  } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      {twoOptions !== false ? (
        <View style={[styles.centeredView, mainViewStyles]}>
          <View style={[styles.modalView, modalBodyStyles]}>
            <View style={{paddingHorizontal: 20}}>
              <Typography size={16} color="#000" align="center">
                {title}
              </Typography>
            </View>
            {inputType && (
              <View style={styles.inputType}>
                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor={COLORS.black}
                  style={{color: COLORS.text}}
                  value={value}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={secureTextEntry}
                  onChangeText={onChangeText}
                  autoFocus={autoFocus}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </View>
            )}
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity
                style={[
                  styles.inputType,
                  {borderWidth: 0, width: '48%', backgroundColor: COLORS.black},
                ]}
                onPress={onPressOne}>
                <Typography align="center" color={COLORS.white}>
                  {optionOne}
                </Typography>
              </TouchableOpacity>
              {inputType == true ? (
                <TouchableOpacity
                  style={[
                    styles.inputType,
                    {
                      borderWidth: 0,
                      marginLeft: 15,
                      width: '48%',
                      backgroundColor:
                        value.length > 2 ? COLORS.primary : COLORS.gray,
                    },
                  ]}
                  disabled={value.length > 2 ? false : true}
                  onPress={onPressTwo}>
                  <Typography align="center" color={COLORS.white}>
                    {optionTwo}
                  </Typography>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.inputType,
                    {
                      borderWidth: 0,
                      marginLeft: 15,
                      width: '48%',
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                  onPress={onPressTwo}>
                  <Typography align="center" color={COLORS.white}>
                    {optionTwo}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ) : (
        modalView
      )}
    </Modal>
  );
};
const createStyles = () =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: width / 1.2,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    inputType: {
      marginVertical: 10,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 1,
      width: '100%',
      height: 50,
      borderColor: COLORS.black,
    },
  });
export default Popup;
