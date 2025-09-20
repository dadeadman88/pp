import React, { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "./BottomSheet";
import { imageCamera, imagePicker } from "../../utils/utils";
import { COLORS, screenHeight, screenWidth } from "../../constants";
import { Typography } from "./Typography";

export const ImageUploader = (props: any) => {
  const {
    title = "Upload Image",
    description,
    onSelect = () => {},
    multiple = false,
    minFiles = 1,
    maxFiles = 1,
  } = props;

  const actionSheet: any = useRef();
  const [image, setImage]: any = useState(null);

  const _renderImageView = () => {
    if (multiple && image.length > 1) {
      // console.log('image', image)
      return (
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {image.map((i: any) => (
            <Image
              source={i}
              style={{
                width: screenWidth("27"),
                height: screenWidth("27"),
                margin: 6,
                borderRadius: 10,
              }}
            />
          ))}
        </View>
      );
    } else {
      return (
        <Image
          source={image}
          style={{ flex: 1, width: "100%", borderRadius: 10 }}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        minHeight: screenHeight(30),
        // backgroundColor: '#00B2DD12',
        backgroundColor: "#F9F9FC",
        borderWidth: 1,
        // borderColor: '#00B2DD',
        borderColor: "#CACDD4",
        borderRadius: 10,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
      onPress={() => {
        actionSheet.current.show({
          title: "Select Image",
          options: ["Camera", "Gallery", "Cancel"],
          cancelButtonIndex: 2,
          onSelect: (index: any) => {
            switch (index) {
              case 0:
                imageCamera().then((image: any) => {
                  onSelect(image);
                  setImage(image);
                  actionSheet.current.close();
                });
                break;

              case 1:
                imagePicker({
                  multiple,
                  minFiles,
                  maxFiles,
                }).then((image: any) => {
                  onSelect(image);
                  setImage(image);
                  actionSheet.current.close();
                });
                break;

              default:
                break;
            }
          },
        });
      }}
    >
      {!image ? (
        <>
          <Icon name="cloud-upload" color={COLORS.primary} size={35} />
          <Typography textType="light">{title}</Typography>
          {description && (
            <Typography textType="light" size={12} color={COLORS.darkGray}>
              {description}
            </Typography>
          )}
        </>
      ) : (
        _renderImageView()
      )}

      <BottomSheet ref={actionSheet} />
    </TouchableOpacity>
  );
};
