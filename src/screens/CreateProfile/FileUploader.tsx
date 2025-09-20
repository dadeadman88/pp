import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {imagePicker} from '../../utils/ImagePicker';
import {COLORS, screenHeight} from '../../constants';
import {Typography} from '../../components/atoms';
import Video from 'react-native-video';

interface Props {
  onChange: (e: any) => void;
  values?: Array<any>;
}

const FileUploader = ({values = [], onChange}: Props) => {
  const [files, setFiles] = useState<any>(values);

  const onRemove = (index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  };

  const onSelect = () => {
    imagePicker({multiple: true}).then(fileArr => {
      setFiles([...files, ...fileArr]);
    });
  };

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <TouchableOpacity
      disabled={files.length > 0}
      style={styles.uploadContainer}
      onPress={onSelect}>
      {files.length == 0 ? (
        <>
          <FaIcon name={'camera'} color={COLORS.primary} size={30} />
          <Typography children={`Upload Photos/Videos`} size={18} />
          <Typography
            children={`You can upload upto 12 Photos/Videos`}
            textType="light"
            size={12}
          />
        </>
      ) : (
        <>
          <View style={styles.fileList}>
            {files.map((i: any, index: number) => {
              const isVideo = i.type.search('video') === 0;

              return (
                <View>
                  <TouchableOpacity
                    onPress={() => onRemove(index)}
                    style={styles.removeBtn}>
                    <FaIcon name={'times'} color={'#fff'} />
                  </TouchableOpacity>
                  {isVideo ? (
                    <Video
                      paused={true}
                      source={i}
                      onBuffer={() => {}}
                      onError={() => {}}
                      style={{width: 100, height: 100, borderRadius: 10}}
                      controls={false}
                    />
                  ) : (
                    <Image
                      source={i}
                      style={{width: 100, height: 100, borderRadius: 10}}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <TouchableOpacity onPress={onSelect} style={{marginTop: 10}}>
            <Typography children={'+ Add More'} />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

export default FileUploader;

const styles = StyleSheet.create({
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderStyle: 'dashed',
    borderRadius: 10,
    minHeight: screenHeight(25),
    marginTop: 10,
    padding: 10,
  },
  removeBtn: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 99,
    borderRadius: 20,
  },
  fileList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
});
