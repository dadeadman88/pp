import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Typography } from "./Typography";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants";

export const ProfileProductCard = ({ item, style = {} }) => {
  const [fav, setFav] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.card, style]}
        activeOpacity={1}
        onPress={() => {}}
      >
        <ImageBackground
          source={{ uri: item?.images[0]?.image_url }}
          resizeMode={"cover"}
          style={{ height: 150 }}
          imageStyle={{ borderRadius: 10 }}
        >
          <TouchableOpacity
            onPress={() => setFav(!fav)}
            style={styles.favorateIcon}
          >
            {item.is_liked ? (
              <FaIcon name={"heart"} color={"red"} size={15} />
            ) : (
              <FaIcon name={"heart-o"} color={"#000"} size={15} />
            )}
          </TouchableOpacity>
        </ImageBackground>

        <View style={{ paddingTop: 10 }}>
          <Typography
            size={16}
            children={item.name}
            textType={"semiBold"}
            numberOfLines={1}
          />
          <Typography
            children={item.category}
            size={12}
            textType={"light"}
            capitalize={true}
            color={"#F5730D"}
            style={{ marginBottom: 5 }}
          />

          <Typography size={20} color={COLORS.primary}>
            <Typography
              size={10}
              children={"$"}
              style={{ lineHeight: 30 }}
              color={COLORS.primary}
            />
            2.16
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "95%",
    marginVertical: 10,
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
