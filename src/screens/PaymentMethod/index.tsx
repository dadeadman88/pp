import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import {COLORS} from '../../constants';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { navigate } from '../../navigation/RootNavigation';

const PaymentMethod = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader color={COLORS.text} title={'PaymentMethod'} />

      <ScrollView contentContainerStyle={{padding: 20, gap: 20}}>
        {
          OPTIONS.map(i => <TouchableOpacity style={styles.cardView} onPress={()=>navigate('PaymentDetail')}>
            {i.icon}
            <View>
            <Typography children={i.title} size={16} />
            <Typography children={i.desc} size={12} color={COLORS.darkGray} />
            </View>
          </TouchableOpacity>)
        }
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10,
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

const OPTIONS = [
  {
    title: 'Credit Card',
    desc: 'Pay with MasterCard, Visa or Visa Electron.',
    icon: <FaIcon name={'credit-card'} color={COLORS.primary} size={18} style={{marginTop: 5}} />
  },{
    title: 'Wallet',
    desc: 'Pay with your wallet.',
    icon: <FaIcon name={'wallet'} color={'#12A3BD'} size={18} style={{marginTop: 5}} />
  },{
    title: 'PayPal',
    desc: 'Faster & safer way to send money.',
    icon: <FaIcon name={'paypal'} color={'#0085CC'} size={22} style={{marginTop: 5}} />
  },{
    title: 'Apple Pay',
    desc: 'Pay with apple pay account.',
    icon: <FaIcon name={'apple'} color={'#000'} size={24} style={{marginTop: 5}} />
  },
];
