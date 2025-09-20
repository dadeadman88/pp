import React, {useState} from 'react';
import {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
  ImageBackground,
} from 'react-native';
import EtIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {formatWithMask} from 'react-native-mask-input';

import {InputText, Typography} from '../../components/atoms';
import {COLORS, IMAGES} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Button} from '../../components/atoms/Button';
import { TransparentHeader } from '../../components/headers/TransparentHeader';

const expiryMask = [/\d/, /\d/, '/', /\d/, /\d/];
const cardMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Payment = props => {
  const [errors, setErrors]: any = useState({});

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [save, setSave] = useState(false);

  const inputRef: any = useRef([]);

  return (
    <SafeAreaContainer  mode="light"
    safeArea={false}
    backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Payment Detail'} color={COLORS.text} />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        <CreditCard expiry={expiry} number={cardNumber} holder={name} />

        <View style={styles.formContainer}>
          <InputText
            label={'Card Holder Name'}
            placeholder={''}
            onChangeText={text => setName(text)}
            value={name}
            error={errors.name}
            keyboardType={'default'}
            returnKeyType={'next'}
            inputRef={e => (inputRef['name'] = e)}
            style={{marginBottom: 20}}
            onSubmitEditing={() => inputRef['cardNumber']?.focus()}
          />

          <InputText
            label={'Card Number'}
            placeholder={'**** **** **** ****'}
            onChangeText={text =>
              setCardNumber(
                formatWithMask({
                  text: text,
                  mask: cardMask,
                }).masked,
              )
            }
            value={cardNumber}
            error={errors.email}
            keyboardType={'number-pad'}
            returnKeyType={'next'}
            inputRef={e => (inputRef['cardNumber'] = e)}
            style={{marginBottom: 20}}
            onSubmitEditing={() => inputRef['password']?.focus()}
            rightIcon={<EtIcon name={'credit-card'} color={COLORS.label} size={16} />}
          />

          <View
            style={{
              flexDirection: 'row',
              gap: 10
            }}>
            <InputText
              label={'Expiry Date'}
              placeholder={'MM/YY'}
              maxLength={5}
              onChangeText={text => {
                setExpiry(
                  formatWithMask({
                    text: text,
                    mask: expiryMask,
                  }).masked,
                );
              }}
              value={expiry}
              error={errors.email}
              keyboardType={'number-pad'}
              returnKeyType={'next'}
              inputRef={e => (inputRef['expiry'] = e)}
              style={{marginBottom: 20, flex: 1}}
              onSubmitEditing={() => inputRef['cvc']?.focus()}
            />
            <InputText
              label={'CVV/CVC'}
              placeholder={'***'}
              maxLength={3}
              onChangeText={text => setCvc(text)}
              value={cvc}
              error={errors.cvc}
              keyboardType={'number-pad'}
              returnKeyType={'next'}
              inputRef={e => (inputRef['cvc'] = e)}
              style={{marginBottom: 20, flex: 1}}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setSave(prev => !prev)}
            activeOpacity={1}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: COLORS.lightGray,
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              {save && (
                <View
                  style={{
                    borderRadius: 20,
                    width: 16,
                    height: 16,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </View>

            <Typography
              size={12}
              children={'Save this card for future payments.'}
              color={'#000'}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 20}}>
          <Button
            label={'Pay Now'}
            onPress={() => props.navigation.navigate('Thankyou')}
            isGradient={true}
          />
        </View>

        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Typography children={'Cancel'} align={'center'} color={'#000'} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const CreditCard = ({expiry, number, holder}) => {

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{
        height: 180,
        borderRadius: 20,
        padding: 20,
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image
          source={IMAGES.logo}
          style={{width: 150, height: 30, marginRight: 10}}
          resizeMode={'contain'}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          flex: 1,
        }}>
        {Array(4)
          .fill('****')
          .map((i, index) => (
            <Typography
              children={number.split(' ')[index] || i}
              color={'#fff'}
              size={20}
              textType={'light'}
            />
          ))}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          <Typography
            children={'Card Holder Name'}
            color={'#fff'}
            size={10}
            textType={'light'}
          />
          <Typography children={holder || '******'} color={'#fff'} size={14} />
        </View>
        <View>
          <Typography
            children={'Expiry Date'}
            color={'#fff'}
            size={10}
            textType={'light'}
          />
          <Typography children={expiry || '**/**'} color={'#fff'} size={14} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
});

export default Payment;
