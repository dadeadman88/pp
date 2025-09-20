import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES, screenWidth} from '../../constants';
import {Typography} from '../../components/atoms';
import { navigate } from '../../navigation/RootNavigation';

const UpcomingCard = ({item}: any) => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigate(`UserProfile`, {data: item})}>
      <Image source={item.image ? {uri: item.image_url}: IMAGES.avatar} style={styles.itemAvatar} />
      <View style={{padding: 10}}>
      <Typography
        children={`Simmer Studio 56`}
        size={18}
        numberOfLines={1}
        style={{marginTop: 10}}
        textType={'semiBold'}
      />
      <Typography
        children={`BOOKING #12001`}
        size={12}
        color={COLORS.primary}
        numberOfLines={1}
        textType={'semiBold'}
      />
      
      <Typography
        children={`Sep 30, 2022 - 8:00 PM`}
        size={14}
        color={COLORS.darkGray}
        numberOfLines={1}
        textType={'light'}
      />
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    width: screenWidth(70),
    maxWidth: 260,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  itemAvatar: {
    borderColor: '#fff',
    width: '100%',
    height: 150,
  },
  discountView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#12A3BD',
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#12A3BD11',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 10,
    marginTop: 10,
  },
});
