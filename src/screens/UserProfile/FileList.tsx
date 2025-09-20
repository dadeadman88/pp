import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import {IMAGES, screenWidth} from '../../constants';
import Video from 'react-native-video';
import {onBack} from '../../navigation/RootNavigation';
import { MediaPreview } from './MediaPreview';

const FileList = (props: any) => {
  const mediaRef = useRef<any>();
  const {media = []} = props.route?.params || {};

  console.log(media);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Photos & Videos'} color={'#000'} />

      <FlatList
        data={media}
        numColumns={3}
        style={{gap: 20}}
        renderItem={({item, index}) => {
          const isVideo = item.type?.search('video') !== -1;
          return (
            <TouchableOpacity
              onPress={() => mediaRef.current.open()}
              style={{borderWidth: 0.5, borderColor: '#00000022'}}>
              {isVideo ? (
                <Video
                  paused={true}
                  source={{uri: item.source_url}}
                  style={{
                    height: screenWidth(33.32),
                    width: screenWidth(33.32),
                  }}
                  controls={false}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={{uri: item.source_url}}
                  style={{
                    height: screenWidth(33.32),
                    width: screenWidth(33.32),
                    resizeMode: 'cover',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
      <MediaPreview ref={mediaRef} media={media} />
    </SafeAreaContainer>
  );
};

export default FileList;
