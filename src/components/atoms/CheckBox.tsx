import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants';
import {Typography} from './Typography';

export const CheckBox = ({
  children,
  checked = false,
  onChange = () => {},
}: any) => {
  const [active, setActive] = React.useState(checked);

  React.useEffect(() => {
    setActive(checked);
  }, [checked]);

  return (
    <TouchableOpacity
      onPress={() => {
        setActive(!active);
        onChange(!active);
      }}
      style={{
        flexDirection: 'row',
        gap: 10,
      }}>
      <View
        style={{
          borderWidth: 1,
          width: 20,
          height: 20,
          borderRadius: 10,
          borderColor: active ? COLORS.primary : COLORS.lightGray,
          backgroundColor: active ? COLORS.primary : COLORS.lightGray,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FaIcon name={'check'} />
      </View>
      <Typography children={children} size={13} />
    </TouchableOpacity>
  );
};
