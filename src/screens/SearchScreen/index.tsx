import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {get} from '../../store/services/Http';
import {useDispatch, useSelector} from 'react-redux';
import {disableLoader, enableLoader} from '../../store/actions/AppActions';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants';
import AdIcon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {Typography} from '../../components/atoms';
import CategoryIcon from '../../components/icons/CategoryIcon';
import FilterIcon from '../../components/icons/FilterIcon';
import {navigate, onBack} from '../../navigation/RootNavigation';
import {
  selectAppState,
  selectUserState,
} from '../../store/selectors/appSelector';

const SearchScreen = (props: any) => {
  const dispatch = useDispatch();
  const {location}: any = useSelector(selectAppState);
  const {searchFilter}: any = useSelector(selectAppState);

  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    getUsers();
  }, [searchFilter, reload])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const inteval = setTimeout(() => {
      getUsers();
    }, 1000);
    return () => {
      clearTimeout(inteval);
    };
  }, [search]);

  const getUsers = () => {
    dispatch(enableLoader());
    get(`users`, {
      search,
      user_type: 2,
      lat: location?.latitude || 0.0,
      lng: location?.longitude || 0.0,
      ...searchFilter
    }).then(res => {
      dispatch(disableLoader());
      if ('response' in res) {
        setList(res.response.data);
      }
    });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={{padding: 20, paddingBottom: 40, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => onBack()}
          style={{
            paddingVertical: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FaIcon name={'arrow-left'} color={'#fff'} size={16} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <SearchBar onChange={setSearch} value={search} />
        </View>
      </LinearGradient>
      <FlatList
        data={list}
        style={{
          flex: 1,
          borderRadius: 20,
          backgroundColor: '#fff',
          marginTop: -20,
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => setReload(!reload)}
            refreshing={false}
          />
        }
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyView}>
            <Typography children={'Not Record Found'} />
          </View>
        )}
        renderItem={({item}: any) => (
          <TouchableOpacity
            style={styles.searchItem}
            onPress={() => navigate(`UserProfile`, {data: item})}>
            <AdIcon name="search1" color={'#999B9F'} size={16} />
            <Typography children={item.name} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaContainer>
  );
};

export default SearchScreen;

const SearchBar = ({onChange, value}: any) => {
  const {searchFilter}: any = useSelector(selectAppState);

  const filterCount = searchFilter.categories.length + (searchFilter.sortBy != "" ? 1 : 0)

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}>
      <View style={styles.searchView}>
        <AdIcon name="search1" color={'#999B9F'} size={16} />
        <TextInput
          placeholder={'Search PictrPrfct'}
          placeholderTextColor={'#999B9F'}
          onChangeText={onChange}
          value={value}
          style={{
            flex: 1,
            padding: 0,
            fontFamily: FONTS.PoppinsRegular,
            color: '#000',
          }}
        />
        <View style={styles.allCatIcon}>
          <CategoryIcon width={18} height={18} />
          <Typography
            children={'All'}
            color={COLORS.darkGray}
            textType={'light'}
            size={12}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate('Filters')}>
        { filterCount > 0 && <View style={styles.filterBadge}>
          <Typography children={filterCount} color="#fff" size={10} />
        </View>}
        <FilterIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // SEARCH BAR STYLING
  searchView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  allCatIcon: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.lightGray,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: '100%',
  },
  divider: {
    backgroundColor: '#E6E6E6',
    height: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  emptyView: {height: 200, justifyContent: 'center', alignItems: 'center'},
  filterBadge: {
    backgroundColor: '#D04848',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    top: -10,
    zIndex: 9,
    position: 'absolute',
  },
});
