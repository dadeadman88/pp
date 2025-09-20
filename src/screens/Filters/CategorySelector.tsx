import React, { useEffect } from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../components/atoms';
import {useState} from 'react';

export const CategorySelector = ({value, onChange}: any) => {
  const [selected, setSelected]: any = useState([...value]);

  useEffect(() => {
    onChange && onChange(selected)
  }, [selected])

  const onSelect = (i: string) => {
    setSelected([...selected, i]);
  };

  const onRemove = (i: string) => {
    setSelected([...selected.filter((c: string) => c != i)]);
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
      {CAT.map(i => {
        const isSelected = selected.includes(i);

        return (
          <TouchableOpacity
            style={{
              backgroundColor: isSelected ? '#43B094' : '#F9F9FC', //#43B094
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
            onPress={() => (isSelected ? onRemove(i) : onSelect(i))}>
            <Typography children={i} color={isSelected ? '#fff' : '#000'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CAT = [
  'All',
  'Photographer',
  'Editor',
  'Videographer',
  'Potrait',
  'Commercial',
  'Travel',
  'Event',
  'Freelance',
  'Wedding',
];
