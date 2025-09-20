import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {COLORS, IMAGES} from '../../constants';

const MessageImage = ({mutliplier = 1}) => {
  return (
    <View>
      <Image
        source={IMAGES.demo4}
        style={[
          styles.userAvatar,
          {
            width: 60 * mutliplier,
            height: 60 * mutliplier,
            borderRadius: 30 * mutliplier,
          },
        ]}
      />
      <View style={styles.statusDot} />
    </View>
  );
};

export default MessageImage;

const styles = StyleSheet.create({
  userAvatar: {
    borderColor: '#fff',
  },
  statusDot: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
