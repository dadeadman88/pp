import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES} from '../../../constants';
import {Typography} from '../../../components/atoms';

const TransactionItem = ({item}: any) => {
  return (
    <TouchableOpacity
      style={styles.itemCard}
      // onPress={() => navigate('Transactions')}
    >
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center'}}>
        <Image
          source={IMAGES.transactionIcon}
          style={{width: 40, height: 40}}
        />
        <View style={{flex: 1}}>
          <Typography
            children={`22 Oct, 2022`}
            color={COLORS.darkGray}
            textType='light'
            size={12}
          />
          <Typography
            children={`PP #12345678`}
            numberOfLines={1}
            textType={'semiBold'}
            size={16}
          />
        </View>
        <Typography children={`$200.00`} textType={'semiBold'} />
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

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
});
