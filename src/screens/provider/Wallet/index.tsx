import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../../containers/SafeAreaContainer';
import {Typography} from '../../../components/atoms';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {TabHeader} from '../../../components/headers/TabHeader';
import {Button} from '../../../components/atoms/Button';
import CardIcon from '../../../components/icons/CardIcon';
import TransactionItem from './TransactionItem';
import { navigate } from '../../../navigation/RootNavigation';

const Wallet = (props: any) => {
  const {backBtn = false} = props.route?.params || {};

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TabHeader title={'Wallet'} backBtn={backBtn} />
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.walletInfo}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Typography children={`Available Balance`} />
            <Typography children={`USD 78.26`} size={28} textType="semiBold" />
          </View>
          <View style={{gap: 10}}>
            <Button
              label={'Top up'}
              borderRadius={50}
              size={'sm'}
              leftIcon={<CardIcon />}
              onPress={() => navigate('Topup')}
            />
            <Button
              label={'Withdraw'}
              borderRadius={50}
              size={'sm'}
              leftIcon={<CardIcon />}
              onPress={() => navigate('Topup', {type: 'withdraw'})}
            />
          </View>
        </View>
        <RowHeader title={'Recent Transactions'} />
      </View>
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

export default Wallet;

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
        <TouchableOpacity onPress={() => navigate('Transactions')}>
        <Typography children={`View All`} size={12} />
        </TouchableOpacity>
        <AdIcon name={'right'} color="#000" />
      </View>
    )}
  </View>
);
