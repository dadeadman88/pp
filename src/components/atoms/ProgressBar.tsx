import React from "react";
import { View } from "react-native";

export const ProgressBar = (props: any) => {
  const {percent = 0} = props;
  return (
    <View style={{flex: 1, height: 5, backgroundColor: '#D8D9DB', borderRadius: 10}}>
      <View style={{backgroundColor: '#27A8AA', height: 5, borderRadius: 10, width: `${percent}%` }} />
    </View>
  );
};
