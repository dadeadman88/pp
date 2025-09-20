import React, {useState} from 'react';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import {ANIM, COLORS, DETAILS, IMAGES, PAYMENTS} from '../../constants';
import {Button} from '../../components/atoms/Button';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import BusinessCard from '../TrackView/BusinessCard';
import AdIcon from 'react-native-vector-icons/AntDesign';
import ConfirmationModal from '../../components/atoms/ConfirmationModal';
import {useSelector} from 'react-redux';
import { selectAppState } from '../../store/selectors/appSelector';

const BookingDetail = (props: any) => {
  const confirmRef: any = React.useRef();
  const {role} = useSelector(selectAppState);
  const [isStarted, setStarted] = useState(false);
  const [isEnded, setEnded] = useState(false);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Booking Detail'} color={'#000'} />
      <ScrollView contentContainerStyle={{padding: 20, gap: 20}}>
        {role == 0 ? (
          <>
            <View>
              <Typography
                children={`Booking Number`}
                color={COLORS.text}
                align="center"
              />
              <Typography
                children={`RSB12345678`}
                color={COLORS.primary}
                size={26}
                textType="semiBold"
                align="center"
              />
            </View>
            <Image
              source={IMAGES.qr}
              style={{width: 180, height: 180, alignSelf: 'center'}}
            />
            <Typography
              children={`Please show this QR to the Photographer when they arrive on the location`}
              color={COLORS.darkGray}
              align="center"
              size={12}
              textType="light"
            />
          </>
        ) : (
          <View style={styles.cardView}>
            <Typography children={`Simon Lewis`} size={16} />
            <Typography
              children={`+1 (908) 1234 567`}
              color={COLORS.secondary}
            />
            <Typography
              children={`4140 Parker Rd, Allentown, SanFrancisco - CA`}
              textType="light"
              size={12}
            />
          </View>
        )}

        {/* <BusinessCard style={{width: '100%'}} /> */}

        <RowHeader title={`Date & Time`} />

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              flex: 1,
            }}>
            <AdIcon name={'calendar'} color={COLORS.primary} size={16} />
            <Typography children={`16, October 2022`} size={12} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              flex: 1,
              borderLeftWidth: 1,
              borderColor: COLORS.darkGray,
              paddingLeft: 20,
            }}>
            <AdIcon name={'clockcircleo'} color={COLORS.primary} size={16} />
            <Typography children={`5:00 PM to 6:00 PM`} size={12} />
          </View>
        </View>

        <RowHeader title={`Booking Details`} />

        <View style={{gap: 20}}>
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

        <RowHeader title={`Payment Details`} />

        <View style={{}}>
          {PAYMENTS.map(i => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <Typography children={i.key} size={12} color="#999B9F" />
              <Typography children={i.value} size={14} />
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            paddingVertical: 20,
            borderStyle: 'dashed',
          }}>
          <Typography children={`Total Amount`} color="#000" />
          <Typography children={`USD 272.12`} color={COLORS.primary} />
        </View>

        {role == 0 && (
          <Button
            label={`Cancel Booking`}
            backgroundColor={'#FF6961'}
            isGradient={false}
            onPress={() => {
              confirmRef.current.open({
                title: 'Confirmation',
                body: `Do you want to cancel your\nbooking request`,
                onSelect: () => {
                  confirmRef.current.close();
                },
              });
            }}
          />
        )}
      </ScrollView>

      {!isEnded && (
        <View style={{backgroundColor: '#fff', padding: 20}}>
          {!isStarted ? (
            <Button
              label={`Start Booking`}
              isGradient={true}
              onPress={() => setStarted(true)}
            />
          ) : (
            <Button
              label={`End Booking`}
              backgroundColor={'#FF6961'}
              isGradient={false}
              onPress={() => setEnded(true)}
            />
          )}
        </View>
      )}
      <ConfirmationModal ref={confirmRef} />
    </SafeAreaContainer>
  );
};

export default BookingDetail;

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
    marginTop: 20,
  },
});

const RowHeader = ({title, hideViewAll = false}: any) => (
  <View style={styles.sectionHeader}>
    <Typography children={title} size={18} textType="semiBold" />
  </View>
);
