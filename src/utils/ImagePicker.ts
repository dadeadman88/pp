import ImagePicker from "react-native-image-crop-picker";

export const imageCamera = () => {
  return ImagePicker.openCamera({
    mediaType: "photo",
    compressImageQuality: 1,
    cropping: true,
  })
    .then((resp: any) => {
      return {
        name: resp.filename || `image_${new Date().getDate()}`,
        type: resp.mime,
        uri: resp.path,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

export const imagePicker = (props?: any) => {
  const {
    multiple = false,
    minFiles = 1,
    maxFiles = 1,
    cropping = false,
    mediaType = 'any'
  } = props || {};

  return ImagePicker.openPicker({
    mediaType,
    compressImageQuality: 1,
    cropping,
    multiple,
    minFiles,
  })
    .then((resp: any) => {
      if (multiple) {
        return resp.map((item: any) => {
          return {
            name: item.path || `image_${new Date().getDate()}`,
            type: item.mime,
            uri: item.path,
          };
        });
      }

      return {
        name: resp.path,
        type: resp.mime,
        uri: resp.path,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};
