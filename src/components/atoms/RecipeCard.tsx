import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome";

import { COLORS, screenWidth } from "../../constants";
import { Typography } from "./Typography";
import { navigate } from "../../navigation/RootNavigation";

export const RecipeCard = ({ data, style = {} }) => {

  return (
    <TouchableOpacity
      key={data.id}
      style={{ ...styles.card, ...style }}
      activeOpacity={1}
      onPress={() => navigate("RecipeDetail", { item: data })}
    >
      <ImageBackground
        source={{ uri: data?.image_url }}
        resizeMode={"cover"}
        style={{ height: 180 }}
        imageStyle={{ borderRadius: 10 }}
      >
      <View
        style={styles.favorateIcon}
      >
        { data.is_liked ? (
          <FaIcon name={"heart"} color={"red"} size={15} />
        ) : (
          <FaIcon name={"heart-o"} color={"#000"} size={15} />
        )}
      </View>

      </ImageBackground>

      <View style={{ paddingTop: 10 }}>
        <Typography size={16} children={data.name} textType={"semiBold"} numberOfLines={1} />
        <Typography size={12} children={`(${data.creator})`} textType={'light'} numberOfLines={1} color={COLORS.primary} />
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
          {/* {Array(5)
            .fill("")
            .map((_, i) => renderRating( 'stars', data.rating > i + 1, COLORS.darkGray ))}
          <Typography
            color="#000"
            children={`(4.8) 200 Reviews`}
            textType={"light"}
            size={12}
          /> */}
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth(80),
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
  },
  favorateIcon: {
    backgroundColor: "#fff",
    position: "absolute",
    padding: 8,
    borderRadius: 20,
    top: 10,
    right: 10,
    zIndex: 99,
  },
});
