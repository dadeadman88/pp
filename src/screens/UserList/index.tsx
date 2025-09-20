import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {TransparentHeader} from '../../components/headers/TransparentHeader';
import NearByUserCard from '../Home/NearByUserCard';
import {get} from '../../store/services/Http';
import {useDispatch, useSelector} from 'react-redux';
import {disableLoader, enableLoader} from '../../store/actions/AppActions';
import {selectAppState} from '../../store/selectors/appSelector';
import axios from 'axios';
import {errorHandler} from '../../utils/utils';

const UserList = (props: any) => {
  const dispatch = useDispatch();
  const {location}: any = useSelector(selectAppState);
  const {title, params = {}} = props.route?.params || {};
  const [reload, setReload] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(enableLoader());
    axios
      .get(`users`, {
        params: {
          user_type: 2,
          ...params,
          ...(location && {
            lat: location?.latitude || 0.0,
            lng: location?.longitude || 0.0,
          }),
        },
      })
      .then(res => {
        dispatch(disableLoader());
        if (res.status < 300) {
          setList(res.data.response.data);
        }
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [reload]);

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={title} color={'#000'} />
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            onRefresh={() => setReload(!reload)}
            refreshing={false}
          />
        }
        contentContainerStyle={{padding: 20, gap: 20}}>
        {list.map(i => (
          <NearByUserCard item={i} />
        ))}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default UserList;

const styles = StyleSheet.create({});
