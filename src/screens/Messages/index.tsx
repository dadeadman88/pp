import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import BellIcon from '../../components/icons/BellIcon';
import MessageCard from './MessageCard';
import MessageImage from './MessageImage';

const Messages = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <Header />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, gap: 20}}>
        <View style={styles.sectionHeader}>
          <Typography children={`Online Now`} size={18} textType="semiBold" />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Typography children={`View All`} size={12} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}>
          {Array(6)
            .fill({})
            .map((_, index) => (
              <TouchableOpacity key={index}>
                <MessageImage mutliplier={1.2} />
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Typography
            children={`Unread Message`}
            size={18}
            textType="semiBold"
          />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Typography children={`View All`} size={12} />
          </View>
        </View>

        {Array(5)
          .fill({})
          .map((_, index) => (
            <MessageCard key={index} />
          ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Header = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    }}>
    <Typography children={'Messages'} size={26} textType="semiBold" />
    <BellIcon />
  </View>
);
