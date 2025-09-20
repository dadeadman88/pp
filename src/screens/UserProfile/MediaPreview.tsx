import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { screenWidth } from '../../constants';
import Video from 'react-native-video';

export const MediaPreview = forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)} animationType='slide'>
      <View style={{
        position: 'absolute',
        zIndex: 1,
        top: 50,
        left: 20,
      }}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            padding: 10,
          }}>
          <FaIcon name={'arrow-left'} color={'#fff'} size={16} />
        </TouchableOpacity>
      </View>

      <FlatList
        initialNumToRender={1}
        horizontal={true}
        data={props.media}
        pagingEnabled={true}
        style={{ flex: 1, backgroundColor: '#000' }}
        renderItem={({ item, index }) => {
          const isVideo = item.type?.search('video') !== -1;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isVideo ? (
                <Video
                  paused={true}
                  source={{ uri: item.source_url }}
                  style={{
                    height: '100%',
                    width: screenWidth(100),
                  }}
                  controls={true}
                  resizeMode={'contain'}
                />
              ) : (
                <Image
                  source={{ uri: item.source_url }}
                  style={{
                    height: '100%',
                    width: screenWidth(100),
                    resizeMode: 'contain',
                  }}
                />
              )}
            </View>
          );
        }}
      />
    </Modal>
  );
});
