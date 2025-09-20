import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Switch} from 'react-native';
import {useDispatch} from 'react-redux';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {Typography} from '../../components/atoms';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {commonStyles} from '../../style';
import {TransparentHeader} from '../../components/headers/TransparentHeader';

const Advance = (props: any) => {
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Settings'} color={'#000'} />
      <ListOption
        title={'Change Password'}
        onPress={() => props.navigation.navigate('ChangePassword')}
      />
      <ListOption
        title={'Notifications'}
        icon={
          <Switch
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            onValueChange={() => setIsEnabled(prev => !prev)}
            trackColor={{false: '#999B9F', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#685EE1' : '#999B9F'}
            value={isEnabled}
          />
        }
      />
      <ListOption
        title={'About Us'}
        onPress={() =>
          props.navigation.navigate('Content', {title: 'About Us'})
        }
      />
      <ListOption
        title={'Terms and Policies'}
        onPress={() =>
          props.navigation.navigate('Content', {title: 'Terms and Policies'})
        }
      />
      <ListOption
        title={'FAQs'}
        onPress={() => props.navigation.navigate('Content', {title: 'FAQs'})}
      />
      <ListOption
        title={'Delete Account'}
        icon={<AdIcon name={'delete'} color={'#FF6961'} size={16} />}
      />
    </SafeAreaContainer>
  );
};

const ListOption = (props: any) => {
  const {
    title,
    icon = <AdIcon name={'right'} color="#000" />,
    onPress = null,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemView}
      disabled={onPress == null}
      onPress={onPress}>
      <View style={{flex: 1}}>
        <Typography children={title} size={15} />
      </View>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Advance;
