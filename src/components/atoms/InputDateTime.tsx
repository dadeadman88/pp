import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Appearance } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { COLORS, FONTSIZE } from "../../constants";
import { Typography } from "./Typography";
import { commonStyles } from "../../style";
import { capitalize } from "../../utils/utils";
import moment from "moment";

export const InputDateTime = (props: any) => {
  const {
    label = null,
    labelColor = "#707070",
    placeholder,
    placeholderColor = COLORS.darkGray,
    textColor = "#707070",
    error,
    errorColor = COLORS.lightRed,
    value,
    onChange = () => {},
    mode = "date",
    is24Hour = false,
    style = {},
    inputStyle = {},
    cardStyle = {},
    rightIcon = null,
    maximumDate = new Date(),
    leftIcon = null
  } = props;

  const [visible, setVisible]: any = useState(false);
  const colorScheme = Appearance.getColorScheme();

  const maxDate = new Date(
    parseInt(moment().subtract(18, 'years').format('YYYY')),
    parseInt(moment().subtract(18, 'years').format('DD')),
    parseInt(moment().subtract(18, 'years').format('MM')),
  )


  return (
    <View style={style}>
      {label && (
        <Typography size={12} color={labelColor} textType={"light"}>
          {label}
        </Typography>
      )}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[commonStyles.inputView, cardStyle, {paddingVertical: 10, gap: 10}]}
      >
        { leftIcon && leftIcon }
        <View style={{ flex: 1, ...inputStyle }}>
          {value ? (
            <Typography textType="light" color={textColor}>
              {value}
            </Typography>
          ) : (
            <Typography color={placeholderColor} textType={"light"}>
              {placeholder}
            </Typography>
          )}
        </View>
        {rightIcon}
      </TouchableOpacity>

      {error != null && error != "" && (
        <Typography
          color={ errorColor }
          size={12}
          textType="light"
          align="right"
        >
          {capitalize(error)}
        </Typography>
      )}

      <DateTimePickerModal
        isDarkModeEnabled={colorScheme == "dark"}
        isVisible={visible}
        mode={mode}
        is24Hour={is24Hour}
        maximumDate={maxDate}
        onConfirm={(e: any) => {
          onChange(
            moment(new Date(e)).format(
              mode == "date" ? "DD-MM-YYYY" : "hh:mm A"
            )
          );
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
