import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {COLORS, IMAGES} from '../../constants';
import {Typography} from '../../components/atoms';
import {RatingStars} from '../../components/atoms/RatingStars';

const BookingCard = ({item}: any) => {
  return (
    <View style={styles.itemCard}>
      <Image source={item?.image || IMAGES.demo4} style={styles.serviceIcon} />
      <View style={{flex: 1, gap: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography
            children={`Simmer Studio 56`}
            numberOfLines={1}
            textType={'semiBold'}
          />
          <Typography children={`In Progress`} size={10} textType={'light'} />
        </View>
        <RatingStars />
        <Typography children={`USD 272.12`} size={16} textType='semiBold' />
        <Typography children={`120 min`} size={12} color={COLORS.primary} />
        
        <View style={{height: 1, backgroundColor: COLORS.lightGray, marginVertical: 5}} />
        <Typography
          children={`Fri 16th Oct, 2022, Sun 17th Oct,\n2022 5:00 PM to 6:00 PM`}
          size={12}
          color={COLORS.darkGray}
          textType='light'
        />
      </View>
    </View>
  );
};

export default BookingCard;

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
    elevation: 6,
  },
  serviceIcon: {
    borderColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 10
  },
});
