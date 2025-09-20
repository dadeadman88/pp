import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../components/atoms';
import {useState} from 'react';
import RadioIcon from '../../components/icons/RadioIcon';

export const SortSelector = ({value, onChange}: any) => {
  const [selected, setSelected]: any = useState(value || '');

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  const onSelect = (i: string) => {
    setSelected(i);
  };

  return (
    <View style={{gap: 20}}>
      {CAT.map(i => {
        const isSelected = selected == i.value;

        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => onSelect(i.value)}>
            <Typography children={i.label} color={'#000'} />
            <RadioIcon checked={isSelected} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CAT = [
  {
    label: 'Recommended (default)',
    value: '',
  },
  {
    label: 'Top Rated',
    value: 'rating',
  },
  {
    label: 'Nearby',
    value: 'nearby',
  },
  {
    label: 'Distance',
    value: 'distance',
  },
];
