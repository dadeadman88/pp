import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, screenHeight} from '../../constants';
import {Typography} from './Typography';
import {useSelector} from 'react-redux';

export const EmptyList = (props: any) => {
  const {title = 'No Record Found', style = {}} = props;
  return (
    <View
      style={[
        styles.headerView,
        style,
      ]}>
      <Typography style={{width: '80%'}} align="center" color={COLORS.darkGray}>
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight(50),
    backgroundColor: '#fff',
  },
});
