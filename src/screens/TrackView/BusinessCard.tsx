import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES, screenWidth} from '../../constants';
import {Typography} from '../../components/atoms';
import {RatingStars} from '../../components/atoms/RatingStars';
import {LocationIcon} from '../../components/tabIcons';
import {navigate} from '../../navigation/RootNavigation';

const BusinessCard = ({item, style}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.itemCard, style]}
      onPress={() => navigate('UserProfile', {data: item})}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Image
          source={item?.image ? {uri: item.image_url} : IMAGES.avatar}
          style={styles.itemAvatar}
        />
        <View style={{flex: 1}}>
          <Typography
            children={item.name}
            capitalize={true}
            size={18}
            numberOfLines={1}
            style={{marginTop: 10}}
          />
          <Typography
            children={item.addresses[0]?.address}
            size={12}
            color={COLORS.darkGray}
            numberOfLines={1}
            textType={'light'}
          />
          <RatingStars style={{marginVertical: 5}} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <LocationIcon width={16} height={16} color={'#2AA9A8'} />
          <Typography
            children={`${
              Math.round(item.distance * 0.621371 * 100) / 100
            } mi away`}
            size={12}
            textType="light"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Typography children={`$${item.min_rate}`} />
          <Typography
            children={`/hr`}
            color={COLORS.darkGray}
            size={12}
            textType="light"
          />
        </View>

        {/* <View style={styles.discountView}>
          <Typography
            children={`50% Off`}
            size={12}
            textType="light"
            color="#12A3BD"
          />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    width: 300,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 10,
  },
  itemAvatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
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
