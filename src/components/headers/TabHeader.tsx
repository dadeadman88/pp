import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../atoms';
import BellIcon from '../icons/BellIcon';
import {navigate, onBack} from '../../navigation/RootNavigation';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

export const TabHeader = ({title, backBtn = false}: any) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    }}>
    { backBtn && <TouchableOpacity
      onPress={() => onBack()}
      style={{
        paddingVertical: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FaIcon name={'arrow-left'} color={'#000'} size={16} />
    </TouchableOpacity>}
    <Typography children={title} size={26} textType="semiBold" />
    <TouchableOpacity onPress={() => navigate('Notifications')}>
      <BellIcon />
    </TouchableOpacity>
  </View>
);
