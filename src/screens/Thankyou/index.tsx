import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import {ANIM, COLORS, IMAGES} from '../../constants';
import {Button} from '../../components/atoms/Button';
import LottieView from 'lottie-react-native';
import { navigate } from '../../navigation/RootNavigation';

const Thankyou = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <ScrollView contentContainerStyle={{padding: 20, gap: 30}}>
        <View>
          <View style={{alignItems: 'center'}}>
            <LottieView
              source={ANIM.thankyou}
              style={{width: 200, height: 200}}
              autoPlay
              loop={false}
            />
          </View>

          <Typography
            children={`Thankyou`}
            size={24}
            textType="semiBold"
            align="center"
          />
        </View>

        <Typography
          children={`Hey, Thankyou for booking our service, We'll send a confirmation message on your given contact information.`}
          color={COLORS.darkGray}
          align="center"
        />
        <View>
          <Typography
            children={`Booking Number`}
            color={COLORS.text}
            align="center"
          />
          <Typography
            children={`RSB12345678`}
            color={COLORS.primary}
            size={26}
            textType="semiBold"
            align="center"
          />
        </View>
        <Image
          source={IMAGES.qr}
          style={{width: 180, height: 180, alignSelf: 'center'}}
        />
        <Typography
          children={`Please show this QR to the photographer when they arrive on the location, You can also take screenshot and the same QR has emailed to you as well`}
          color={COLORS.darkGray}
          align="center"
          size={12}
          textType="light"
        />

        <Button label={`View Booking Details`} onPress={()=>navigate('BookingDetail')} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Thankyou;
