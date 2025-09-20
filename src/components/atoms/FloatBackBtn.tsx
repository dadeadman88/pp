import {
  TouchableOpacity,
} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {onBack} from '../../navigation/RootNavigation';

export const FloatBackBtn = () => {
  return (
    <TouchableOpacity
      onPress={() => onBack()}
      style={{
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        position: 'absolute',
        top: 30,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 9999,
        
      }}>
      <AdIcon name={'left'} color={'#000'} />
    </TouchableOpacity>
  );
};
