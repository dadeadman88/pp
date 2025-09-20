import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Typography } from "./Typography";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { navigate } from "../../navigation/RootNavigation";

export const ItemCard = (props) => {
  const { item } = props;
  const [fav, setFav] = useState(false);

  return (
    <TouchableOpacity
      style={{ ...styles.card }}
      activeOpacity={1}
      onPress={() => navigate('ItemDetail', { item }) }
    >
      <ImageBackground
        source={{ uri: item.image_url}}
        resizeMode={"contain"}
        style={{ height: 140 }}
        imageStyle={{ borderRadius: 10 }}
      />
      <View style={{ paddingTop: 10 }}>
        <Typography size={14} children={item.name} textType={"semiBold"} numberOfLines={2} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  }
});
