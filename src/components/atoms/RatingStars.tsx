import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import AdIcon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../constants";
import { Typography } from "./Typography";

export const RatingStars = (props: any) => {
  const {
    rating = 5, size = 14, color = COLORS.rating,
    label = "4.8 (120+)",
    style = {}
  } = props;

  const stars = new Array(parseInt(rating)).fill(0);
  
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginVertical: 5, ...style }}>
    {stars.map((_, index) => <AdIcon name={'star'} color={color} size={size} key={`rating_${index}`} />)}
    { label && <Typography children={label} size={12} style={{marginLeft: 5}} />}
  </View>;
};

const styles = StyleSheet.create({});
