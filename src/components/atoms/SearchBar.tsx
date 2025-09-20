import * as React from "react";
import { TextInput, View } from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { COLORS, FONTS } from "../../constants";

export const SearchBar = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9FC",
        padding: 15,
        borderRadius: 10,
      }}
    >
      <FaIcon name={"search"} size={16} color={"#999B9F"} />
      <TextInput
        placeholder="Search Here"
        placeholderTextColor={"#999B9F"}
        style={{
          color: COLORS.text,
          flex: 1,
          marginLeft: 10,
          fontFamily: FONTS.PoppinsRegular,
          padding: 0,
        }}
      />
    </View>
  );
};
