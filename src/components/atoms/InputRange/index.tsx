import React, {useCallback, useState, useEffect} from 'react';
import {View} from 'react-native';
import {COLORS} from '../../../constants';
import {Typography} from '../Typography';
import {capitalize} from '../../../utils/utils';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';

export const  InputRange = (props: any) => {
  const {
    label = null,
    labelColor = '#707070',
    error = '',
    errorColor = COLORS.lightRed,
    style = {},
    cardStyle = {},
    lowValue = 0,
    highValue = 100,
    onChange = (min: any, max: any) => {}
  } = props;

  const [low, setLow] = useState(lowValue);
  const [high, setHigh] = useState(highValue);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: any) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: any, high: any) => {
    setLow(low);
    setHigh(high);
  }, []);

  useEffect(() => {
    onChange(low, high);
  }, [low, high]);

  return (
    <View style={{gap: 8, ...style}}>
      {label && (
        <Typography
          size={12}
          color={labelColor}
          textType={'light'}
          children={label}
        />
      )}
      <View style={[cardStyle]}>
        <Slider
          style={{width: '100%', height: 30}}
          min={0}
          max={100}
          step={1}
          low={low}
          high={high}
          disableRange
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>
      {error != '' && (
        <Typography color={errorColor} size={12} textType="light" align="right">
          {capitalize(error)}
        </Typography>
      )}
    </View>
  );
};
