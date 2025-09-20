import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {Typography} from '../../components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants';
import {Calendar} from 'react-native-calendars';
import { Button } from '../../components/atoms/Button';
import { navigate } from '../../navigation/RootNavigation';
import { TransparentHeader } from '../../components/headers/TransparentHeader';

const CreateBooking = (props: any) => {
  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1}}>
        <TransparentHeader />

        <ScrollView
          style={styles.container}
          contentContainerStyle={{gap: 20}}>
          <Calendar
            theme={styles.calendar}
            onDayPress={day => {
              // setSelected(day.dateString);
            }}
            markedDates={
              {
                // [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }
            }
          />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}>
            <Typography
              children={`Select type of photography`}
              size={18}
              textType="semiBold"
            />
            <OptionSelector options={['Portraiture', 'Wedding', 'Event']} />

            <Typography
              children={`How many hours of the service would you like?`}
              size={18}
              textType="semiBold"
            />
            <OptionSelector
              options={range(2, 12).map(i => `${i}`.padStart(2, '0'))}
            />

            <Typography
              children={`How many events you want us to shoot?`}
              size={18}
              textType="semiBold"
            />
            <OptionSelector
              options={range(1, 5).map(i => `${i}`.padStart(2, '0'))}
            />

            <Typography
              children={`Which shift you require the photographer to serve?`}
              size={18}
              textType="semiBold"
            />
            <OptionSelector options={TIMINGS} />
            
            <Button label={`Continue`} onPress={()=> navigate('BookingNotes') } />
          
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaContainer>
  );
};

export default CreateBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    dayTextColor: '#fff',
    calendarBackground: 'transparent',
    backgroundColor: 'transparent',
    textSectionTitleColor: '#fff',
    selectedDayBackgroundColor: '#fff',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#fff',
    monthTextColor: '#fff',
    indicatorColor: '#fff',
    arrowColor: '#fff',
    textDayFontFamily: FONTS.PoppinsRegular,
    textMonthFontFamily: FONTS.PoppinsRegular,
    todayButtonFontFamily: FONTS.PoppinsRegular,
    textDayHeaderFontFamily: FONTS.PoppinsRegular,
    textDayFontSize: 14,
    textMonthFontSize: 14,
    todayButtonFontSize: 14,
    textDayHeaderFontSize: 14,
  }
});


const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

const TIMINGS = [
  '10:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
  '08:00 PM',
  '10:00 PM',
];

const OptionSelector = ({options = []}: any) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{gap: 10, padding: 20}}
      style={{marginHorizontal: -20}}>
      {options.map((i: string, index: number) => {
        const isActive = index === selected;
        return (
          <TouchableOpacity
            onPress={() => setSelected(index)}
            activeOpacity={1}
            style={{
              ...(!isActive && {
                borderWidth: 1,
                borderColor: COLORS.lightGray,
              }),
              borderRadius: 10,
            }}>
            <LinearGradient
              colors={
                !isActive
                  ? [COLORS.white, COLORS.white]
                  : [COLORS.secondary, COLORS.primary]
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                borderRadius: 10,
                minWidth: 70,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <Typography
                children={i}
                textType="semiBold"
                size={18}
                color={isActive ? '#fff' : COLORS.text}
              />
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
