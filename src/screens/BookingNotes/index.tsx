import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {InputText, Typography} from '../../components/atoms';
import {COLORS, IMAGES, screenHeight} from '../../constants';
import {Button} from '../../components/atoms/Button';
import {FloatBackBtn} from '../../components/atoms/FloatBackBtn';
import {navigate} from '../../navigation/RootNavigation';

const BookingNotes = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: screenHeight(50)}}>
          <Image
            source={IMAGES.demo1}
            style={{flex: 1, width: '100%', resizeMode: 'cover'}}
          />
          <FloatBackBtn />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: -20,
            borderRadius: 20,
            padding: 20,
            gap: 20,
          }}>
          <Typography
            children={`Event details, and special notes`}
            textType="light"
            align="center"
            color={COLORS.darkGray}
          />
          <Typography
            children={`Is there any thing you would like us to take a note?`}
            size={20}
            textType="semiBold"
            align="center"
          />

          <InputText
            placeholder={'Type here...'}
            multiline={true}
            inputProps={{
              numberOfLines: 8,
              textAlignVertical: 'top',
              verticalAlign: 'top',
            }}
          />

          <Button
            label={`Continue`}
            onPress={() => navigate('SelectLocation')}
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BookingNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});
