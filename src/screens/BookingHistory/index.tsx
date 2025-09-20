import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import BookingCard from './BookingCard';
import { TabHeader } from '../../components/headers/TabHeader';

const BookingHistory = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TabHeader title={'Booking History'} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: 20, gap: 20}}>
        {Array(5)
          .fill({})
          .map((_, index) => (
            <BookingCard key={index} />
          ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});