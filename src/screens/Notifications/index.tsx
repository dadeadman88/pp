import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import { IMAGES } from '../../constants';
import { Typography } from '../../components/atoms';
import { TransparentHeader } from '../../components/headers/TransparentHeader';


const Notifications = (props: any) => {

  return (
    <SafeAreaContainer
    mode="light"
    safeArea={false}
    backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Notifications'} color={'#000'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{padding: 20, gap: 20}}>
        {LIST.map(i => (
          <View style={styles.card}>
            <Image
              source={IMAGES.avatar}
              style={{width: 40, height: 40, borderRadius: 25}}
            />
            <View style={styles.cardContent}>
              <Typography children={i.title} textType="semiBold" />
              <Typography children={i.body} size={11} color="#595959" />
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 5}}>
                <Typography
                  children={`2 hours ago`}
                  size={11}
                  color="#595959"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  card: {
    gap: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
});

const LIST = [
  {
    title: 'New Like',
    body: `Congratulations, You've recevied a new like from a profile.`,
  },
  {
    title: `New Booking Request`,
    body: `You got a booking request from steven. Please accept before 24 hours.`,
  },
  {
    title: `New Message`,
    body: `Steven message you.`,
  },
  {
    title: `New Booking Request`,
    body: `You got a booking request from steven. Please accept before 24 hours.`,
  },
];
