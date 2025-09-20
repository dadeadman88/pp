import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import SafeAreaContainer from '../../../containers/SafeAreaContainer';
import {InputText, Typography} from '../../../components/atoms';
import {Button} from '../../../components/atoms/Button';
import {TransparentHeader} from '../../../components/headers/TransparentHeader';
import {COLORS, IMAGES, } from '../../../constants';
import {reset} from '../../../navigation/RootNavigation';

const WithdrawDetails = (props: any) => {
  const successRef: any = useRef();

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Bank Details'} color={'#000'} />
      <View style={{padding: 20}}>
        <InputText
          placeholder={`Account Holder Name`}
          style={{marginBottom: 20}}
        />
        <InputText
          placeholder={`Account Number / IBAN`}
          style={{marginBottom: 20}}
        />
        <InputText placeholder={`Swift Code`} style={{marginBottom: 20}} />
        <InputText placeholder={`Bank Name`} style={{marginBottom: 20}} />
        <InputText
          placeholder={`Bank Branch City`}
          style={{marginBottom: 20}}
        />
        <InputText placeholder={`Bank Address`} style={{marginBottom: 20}} />
        <Button label={'Withdraw'} onPress={() => successRef.current.open()} />
      </View>
      <SuccessModal ref={successRef} />
    </SafeAreaContainer>
  );
};

export default WithdrawDetails;

const styles = StyleSheet.create({});

const SuccessModal = forwardRef((props, ref) => {
  const [payload, setPayload] = useState({
    visible: false,
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setPayload({visible: true});
    },
    close: () => {
      setPayload({visible: false});
    },
  }));

  return (
    <Modal visible={payload.visible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            gap: 20,
          }}>
          <Image
            source={IMAGES.avatar}
            style={{
              width: 100,
              height: 100,
              marginTop: -60,
              borderWidth: 4,
              borderColor: '#fff',
              borderRadius: 50,
            }}
          />
          <Typography children={'Thank You!'} textType="bold" size={26} />
          <Typography
            children={`You request to withdraw money has\nbeen submitted, You’ll receive your amount\n In 2 - 3 working days`}
            align="center"
            size={13}
            color={COLORS.darkGray}
            textType="light"
            style={{lineHeight: 22}}
          />
          <Typography
            children={'$200.00'}
            textType="semiBold"
            size={24}
            color={COLORS.primary}
          />
          <Button
            label={'Done'}
            style={{width: '100%'}}
            onPress={() => reset('Tabs')}
          />
        </View>
      </View>
    </Modal>
  );
});
