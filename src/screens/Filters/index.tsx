import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from '../../components/atoms';
import {CategorySelector} from './CategorySelector';
import {SortSelector} from './SortSelector';
import {Button} from '../../components/atoms/Button';
import {onBack} from '../../navigation/RootNavigation';
import { selectAppState } from '../../store/selectors/appSelector';
import { updateAppStates } from '../../store/actions/AppActions';

const Filters = (props: any) => {
  const dispatch = useDispatch();
  const {searchFilter} = useSelector(selectAppState);
  const [filter, setFilter]: any = useState({
    // categories: [],
    // sortBy: '',
    ...searchFilter
  });

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={'Filters'} color={'#000'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{padding: 20, gap: 20}}>
        <Typography children={`Categories`} size={20} textType="semiBold" />
        <CategorySelector value={filter.categories} onChange={(value: any) => {
          setFilter({...filter, categories: value});
        }} />

        <Typography children={`Sort`} size={20} textType="semiBold" />
        <SortSelector value={filter.sortBy} onChange={(value: any) => {
          setFilter({...filter, sortBy: value});
        }} />

        <Button label={'Apply Filter'} onPress={() => {
          dispatch(updateAppStates({
            searchFilter: {...filter}
          }));
          onBack()
        }} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Filters;
