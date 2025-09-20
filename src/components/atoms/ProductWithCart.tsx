import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, screenWidth } from "../../constants";
import { Typography } from "./Typography";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { renderRating } from "./ProductCard2";
import { navigate } from "../../navigation/RootNavigation";

export const ProductWithCart = ({ data, width = screenWidth(80), index }) => {
  const [fav, setFav] = useState(false);

  return (
    <TouchableOpacity
      key={data.id}
      style={{ ...styles.card, width }}
      activeOpacity={1}
      onPress={() => navigate("ProductDetail", { item: data })}
    >
      <ImageBackground
        source={{ uri: data?.images[0]?.image_url }}
        resizeMode={"cover"}
        style={{ height: 180 }}
        imageStyle={{ borderRadius: 10 }}
      >
        {/* <TouchableOpacity
          onPress={() => setFav(!fav)}
          style={styles.favorateIcon}
        >
          {fav ? (
            <FaIcon name={"heart"} color={"red"} size={15} />
          ) : (
            <FaIcon name={"heart-o"} color={"#000"} size={15} />
          )}
        </TouchableOpacity> */}
      </ImageBackground>

      <View style={{ paddingTop: 10 }}>
        <Typography size={16} children={data.name} textType={"semiBold"} />
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
          {Array(5)
            .fill("")
            .map((_, i) => renderRating( data.category.toLowerCase(), data.rating > i + 1, COLORS.darkGray ))}
          <Typography
            color="#000"
            children={`(4.8) 200 Reviews`}
            textType={"light"}
            size={12}
          />
          </View>
        <Typography size={12} textType={"light"} children={data.desc} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
