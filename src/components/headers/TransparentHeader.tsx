import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Typography} from '../../components/atoms';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {onBack} from '../../navigation/RootNavigation';

export const TransparentHeader = ({
  color = '#fff',
  title = '',
  fixed = false,
}: any) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      ...(fixed && {
        position: 'absolute',
        zIndex: 99,
        width: '100%',
        paddingTop: Platform.OS == 'android' ? 50 : 0,
      }),
    }}>
    <TouchableOpacity onPress={() => onBack()} style={{padding: 5}}>
      <FaIcon name={'arrow-left'} color={color} size={16} />
    </TouchableOpacity>
    <Typography children={title} size={18} textType="semiBold" color={color} />
    <View style={{width: '8%'}} />
  </View>
);
