import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {MediaPreview} from './MediaPreview';

export const ImageList = ({data}: any) => {
  const mediaRef = useRef<any>();
  const [media, setMedia] = useState<any>([]);

  let index = 0;
  const images = data.reduce((a: any, b: any) => {
    if (a[index] == undefined) {
      a[index] = [b];
    } else if (a[index].length <= 4) {
      a[index].push(b);
    } else {
      index = index + 1;
    }
    return a;
  }, []);

  const onPreview = (source: any) => {
    setMedia([source]);
    mediaRef.current.open();
  };

  return (
    <ScrollView horizontal contentContainerStyle={{gap: 5}}>
      {images.map((i: any, index: number) => (
        <>
          <View style={{width: 200, height: 200}}>
            <RenderMedia
              source={{uri: i[0].source_url}}
              type={i[0].type}
              style={styles.photo1}
              onPress={() => onPreview(i[0])}
            />
          </View>
          <View style={{width: 200, height: 200, gap: 5}}>
            {i[1] && (
              <RenderMedia
                source={{uri: i[1].source_url}}
                type={i[1].type}
                style={styles.photo2}
                onPress={() => onPreview(i[1])}
              />
            )}
            {i[2] && (
              <View style={{flex: 1, flexDirection: 'row', gap: 5}}>
                <RenderMedia
                  source={{uri: i[2].source_url}}
                  type={i[2].type}
                  style={styles.photo3}
                  onPress={() => onPreview(i[2])}
                />
                {i[3] && (
                  <RenderMedia
                    source={{uri: i[3].source_url}}
                    type={i[3].type}
                    style={styles.photo3}
                    onPress={() => onPreview(i[3])}
                  />
                )}
              </View>
            )}
          </View>
        </>
      ))}

      <MediaPreview ref={mediaRef} media={media} />
    </ScrollView>
  );
};

const RenderMedia = ({source, type = '', style, onPress = () => {}}: any) => {
  const isVideo = type?.search('video') !== -1;
  if (isVideo) {
    return (
      <TouchableOpacity style={style} {...{onPress}}>
        <Video
          paused={true}
          source={source}
          style={{flex: 1}}
          controls={false}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={style} {...{onPress}}>
        <Image source={source} style={[{flex: 1, resizeMode: 'cover'}]} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  photo1: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo2: {
    height: '50%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo3: {
    height: '100%',
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
