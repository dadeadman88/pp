import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES, screenWidth} from '../../constants';
import {Typography} from '../../components/atoms';
import {RatingStars} from '../../components/atoms/RatingStars';
import {LocationIcon} from '../../components/tabIcons';
import { navigate } from '../../navigation/RootNavigation';

const NearByUserCard = ({item}: any) => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigate(`UserProfile`, {data: item})}>
      <Image source={item.image ? {uri: item.image_url}: IMAGES.avatar} style={styles.itemAvatar} />
      <Typography
        children={item.name}
        size={18}
        numberOfLines={1}
        style={{marginTop: 10}}
        capitalize={true}
      />
      <Typography
        children={item?.addresses[0]?.address || 'N/A'}
        size={14}
        color={COLORS.darkGray}
        numberOfLines={1}
        textType={'light'}
      />
      <RatingStars style={{marginVertical: 5}} />
      <View style={styles.bottomSection}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <LocationIcon width={16} height={16} color={'#2AA9A8'} />
          <Typography children={`${ ((item.distance || 0) / 0.621371).toFixed(2) } mi away`} size={12} textType="light" />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Typography children={`$${item.min_rate || '0'} - $${item.max_rate || '0'}`} />
          <Typography
            children={`/hr`}
            color={COLORS.darkGray}
            size={12}
            textType="light"
          />
        </View>

        <View style={styles.discountView}>
          <Typography
            children={`50% Off`}
            size={12}
            textType="light"
            color="#12A3BD"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearByUserCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
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
    borderWidth: 2,
    borderColor: '#fff',
    width: '100%',
    height: 150,
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
