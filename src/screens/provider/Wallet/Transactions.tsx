import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SafeAreaContainer from '../../../containers/SafeAreaContainer';
import {Typography} from '../../../components/atoms';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {TabHeader} from '../../../components/headers/TabHeader';
import {Button} from '../../../components/atoms/Button';
import CardIcon from '../../../components/icons/CardIcon';
import TransactionItem from './TransactionItem';
import { TransparentHeader } from '../../../components/headers/TransparentHeader';

const Transactions = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Transactions'} color={"#000"} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 20,
        }}>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  walletInfo: {
    flexDirection: 'row',
    backgroundColor: '#4CB38D1A',
    borderWidth: 2,
    borderColor: '#4CB38D',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
  },
});

const RowHeader = ({title, hideViewAll = false}: any) => (
  <View style={styles.sectionHeader}>
    <Typography children={title} size={18} textType="semiBold" />
    {!hideViewAll && (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Typography children={`View All`} size={12} />
        <AdIcon name={'right'} color="#000" />
      </View>
    )}
  </View>
);
