import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {Typography} from '../../components/atoms';
import MessageImage from './MessageImage';
import { navigate } from '../../navigation/RootNavigation';

const MessageCard = () => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigate('Chat')}>
      <MessageImage />
      <View style={{flex: 1, justifyContent: 'center', gap: 0}}>
        <Typography
          children={`Simmer Studio 56`}
          numberOfLines={1}
          textType={'semiBold'}
        />
        <Typography
          children={`Thank you for your attention`}
          size={12}
          numberOfLines={1}
          color={COLORS.darkGray}
          textType="light"
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', gap: 5}}>
        <Typography children={`10:30 PM`} size={10} textType={'light'} />
        <View style={styles.unreadBadge}>
          <Typography
            children={`2`}
            textType={'light'}
            color="#fff"
            size={12}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  unreadBadge: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 20,
    width: 20,
  },
});
