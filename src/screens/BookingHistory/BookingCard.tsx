import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES, STATUS} from '../../constants';
import {Typography} from '../../components/atoms';
import {RatingStars} from '../../components/atoms/RatingStars';
import {navigate} from '../../navigation/RootNavigation';
import FaIcon from 'react-native-vector-icons/MaterialIcons';

const BookingCard = ({item}: any) => {
  return (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigate('BookingDetail')}>
      <Image source={item?.image || IMAGES.demo4} style={styles.serviceIcon} />
      <View style={{flex: 1, gap: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography
            children={`Simmer Studio 56`}
            numberOfLines={1}
            textType={'semiBold'}
          />
          <Typography
            children={STATUS[item?.status || 'in_progress']}
            size={10}
            textType={'light'}
          />
        </View>
        <RatingStars />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Typography children={`USD 272.12`} size={16} textType="semiBold" />
            <Typography children={`120 min`} size={12} color={COLORS.primary} />
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            {item?.status === 'pending' && (
              <>
                <View style={styles.acceptBtn}>
                  <FaIcon name={'check'} color={'#fff'} size={18} />
                </View>
                <View style={styles.rejectBtn}>
                  <FaIcon name={'close'} color={'#fff'} size={18} />
                </View>
              </>
            )}
            { item?.status === 'accepted' && <View style={styles.locationBtn}>
              <FaIcon name={'location-on'} color={'#fff'} size={18} />
            </View>}
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: COLORS.lightGray,
            marginVertical: 5,
          }}
        />
        <Typography
          children={`- Fri 16th Oct, 2022, Sun 17th Oct, 2022\n- 5:00 PM to 6:00 PM`}
          size={12}
          color={COLORS.darkGray}
          textType="light"
        />
      </View>
    </TouchableOpacity>
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
    borderRadius: 10,
  },
  acceptBtn: {
    backgroundColor: '#4CB38D',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectBtn: {
    backgroundColor: '#FF6961',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBtn: {
    backgroundColor: '#2EAAA5',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
