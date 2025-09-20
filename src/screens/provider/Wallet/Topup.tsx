import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SafeAreaContainer from '../../../containers/SafeAreaContainer';
import {InputText, Typography} from '../../../components/atoms';
import {Button} from '../../../components/atoms/Button';
import {TransparentHeader} from '../../../components/headers/TransparentHeader';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, IMAGES, screenHeight, screenWidth} from '../../../constants';
import { navigate } from '../../../navigation/RootNavigation';

const Topup = (props: any) => {

  const {type} = props.route?.params || {};

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.bgCover}
      />
      <TransparentHeader title={ type == 'withdraw' ? 'Withdraw Amount' : 'Top Up Wallet'} />
      <View style={{padding: 20}}>
        <View style={{alignItems: 'center', marginTop: screenHeight(6)}}>
          <Image source={IMAGES.avatar} style={{width: 100, height: 100}} />
          <Typography children={type == 'withdraw' ? 'Withdraw Amount' : 'Top Up Wallet'} color="#999B9F" size={18} style={{marginTop: 10}} />
        </View>
        <InputText style={{marginTop: 50}} placeholder={`Enter Topup Amount`} keyboardType={'number-pad'} />
        <InputText
          style={{marginVertical: 20}}
          placeholder={`Notes`}
          inputProps={{
            numberOfLines: 10,
            multiline: true,
            textAlignVertical: 'top',
            verticalAlign: 'top'
          }}
        />
        <Button 
          label={type == 'withdraw' ? 'Withdraw' : "Top Up"} 
          onPress={() => navigate( type == 'withdraw' ? 'WithdrawDetails': 'PaymentMethod')} />
      </View>
    </SafeAreaContainer>
  );
};

export default Topup;

const styles = StyleSheet.create({
  bgCover: {
    width: screenWidth(180),
    height: screenWidth(180),
    borderRadius: screenWidth(100),
    position: 'absolute',
    alignSelf: 'center',
    top: screenHeight(-60),
  },
});
