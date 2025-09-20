import React, { useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { Typography } from "./Typography";
import { commonStyles } from "../../style";
import { capitalize } from "../../utils/utils";
import BottomSheetWithSearch from "./BottomSheetWithSearch";
import BottomSheet from "./BottomSheet";

export const SelectInput = (props: any) => {
  const {
    label = null,
    labelColor = "#707070",
    error = "",
    placeholder,
    onSelect = () => {},
    value,
    options = [],
    style = {},
    cardStyle = {},
    leftIcon = null,
    rightIcon = null,
    withSearch = false
  } = props;

  const sheetRef: any = useRef();

  return (
    <View style={style}>
      {label && (
        <Typography size={12} color={labelColor} textType={"light"}>
          {label}
        </Typography>
      )}
      <TouchableOpacity
        onPress={() => {
          sheetRef.current.show({
            title: label,
            options,
            onSelect: (e) => {
              onSelect(e);
              sheetRef.current.close();
            },
          });
        }}
        style={[
          commonStyles.inputView,
          {
            paddingHorizontal: 10,
            paddingVertical: 15,
            gap: 10
          },
          cardStyle
        ]}
        activeOpacity={0.8}
      >
        {leftIcon}
        {value ? (
          <Typography textType="light" children={value} color={labelColor} />
        ) : (
          <Typography children={placeholder} color={COLORS.darkGray} textType={'light'} />
        )}
        {rightIcon}
      </TouchableOpacity>
      {error != "" && (
        <Typography color={COLORS.lightRed} size={12} textType="light" align="right">
          {capitalize(error)}
        </Typography>
      )}
      {
        withSearch ?
        <BottomSheetWithSearch ref={sheetRef} /> :
        <BottomSheet ref={sheetRef} />
      }
    </View>
  );
};
