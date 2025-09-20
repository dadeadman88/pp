import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {InputText, Typography} from '../../components/atoms';
import {COLORS, DETAILS, FONTS, PAYMENTS} from '../../constants';
import {Button} from '../../components/atoms/Button';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import AdIcon from 'react-native-vector-icons/AntDesign';
import BusinessCard from '../TrackView/BusinessCard';
import { navigate } from '../../navigation/RootNavigation';

const BookingSummary = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader color={COLORS.text} title={'Booking Summary'} />

      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={styles.cardView}>
          <Typography children={`Simon Lewis`} size={16} />
          <Typography children={`+1 (908) 1234 567`} color={COLORS.secondary} />
          <Typography
            children={`4140 Parker Rd, Allentown, SanFrancisco - CA`}
            textType="light"
            size={12}
          />
          <TouchableOpacity>
            <Typography children={`Change`} size={10} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <RowHeader title={`Photographer/Studio`} />
        <BusinessCard style={{width: '100%'}} />

        <RowHeader title={`Date & Time`} />

        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1}}>
            <AdIcon name={'calendar'} color={COLORS.primary} size={16} />
            <Typography children={`16, October 2022`} size={12} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1, borderLeftWidth: 1, borderColor: COLORS.darkGray, paddingLeft: 20}}>
            <AdIcon name={'clockcircleo'} color={COLORS.primary} size={16} />
            <Typography children={`5:00 PM to 6:00 PM`} size={12} />
          </View>
        </View>

        <RowHeader title={`Booking Details`} />

        <View style={{gap: 20, marginBottom: 20}}>
          {DETAILS.map(i => (
            <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
              <AdIcon name={'checkcircle'} color={COLORS.primary} size={22} />
              <View style={{flex: 1, gap: 5}}>
                <Typography
                  children={i.ques}
                  color={COLORS.darkGray}
                  textType="light"
                  size={12}
                />
                <Typography children={i.ans} size={14} />
              </View>
            </View>
          ))}
        </View>

        <View style={{}}>
        { PAYMENTS.map( i => <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
          <Typography children={i.key} size={12} color='#999B9F' />
          <Typography children={i.value} size={14} />
        </View>) }
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingVertical: 20, borderStyle: 'dashed'}}>
          <Typography children={`Total Amount`} color='#000' />
          <Typography children={`USD 262.12`} color={COLORS.primary} />
        </View>

        <Button label={'Pay USD 262.12'} onPress={()=>navigate('PaymentMethod')} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    backgroundColor: '#fff',
    padding: 10,
    gap: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
});

const RowHeader = ({title, hideViewAll = false}: any) => (
  <View style={styles.sectionHeader}>
    <Typography children={title} size={18} textType="semiBold" />
    {!hideViewAll && (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <AdIcon name={'edit'} color="#000" size={20} />
      </View>
    )}
  </View>
);
