import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigate, navigationRef} from './RootNavigation';

export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();

import Splash from '../screens/Splash';
import RoleSelection from '../screens/RoleSelection';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';
import Verification from '../screens/Verification';
import ResetPassword from '../screens/ResetPassword';
import Started from '../screens/Started';
import LocationPermission from '../screens/LocationPermission';
import CreateProfile from '../screens/CreateProfile';
import AddressForm from '../screens/AddressForm';
import Home from '../screens/Home';
import BottomTabs from './BottomTabs';
import BookingHistory from '../screens/BookingHistory';
import TrackView from '../screens/TrackView';
import Messages from '../screens/Messages';
import Settings from '../screens/Settings';
import UserProfile from '../screens/UserProfile';
import CreateBooking from '../screens/CreateBooking';
import BookingNotes from '../screens/BookingNotes';
import SelectLocation from '../screens/SelectLocation';
import BookingSummary from '../screens/BookingSummary';
import PaymentMethod from '../screens/PaymentMethod';
import PaymentDetail from '../screens/PaymentDetail';
import Thankyou from '../screens/Thankyou';
import BookingDetail from '../screens/BookingDetail';
import Chat from '../screens/Chat';
import Notifications from '../screens/Notifications';
import {useDispatch, useSelector} from 'react-redux';
import TabNavigatorProvider from './TabNavigatorProvider';
import Transactions from '../screens/provider/Wallet/Transactions';
import Topup from '../screens/provider/Wallet/Topup';
import WithdrawDetails from '../screens/provider/Wallet/WithdrawDetails';
import Advance from '../screens/Settings/Advance';
import ChangePassword from '../screens/ChangePassword';
import {selectAppState} from '../store/selectors/appSelector';
import UserList from '../screens/UserList';
import SearchScreen from '../screens/SearchScreen';
import Filters from '../screens/Filters';
import Wallet from '../screens/provider/Wallet';
import StaticContent from '../screens/Settings/StaticContent';
import FileList from '../screens/UserProfile/FileList';
import {Loader} from '../containers/SafeAreaContainer';
import { getCurrentLocation } from '../utils/GeoLocation';
import { updateAppStates } from '../store/actions/AppActions';

export default MainNavigation = () => {
  const {splash, authorize, loader} = useSelector(selectAppState);
  if (splash) return <Splash />;

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {authorize ? <AppNavigation /> : <AuthNavigation />}
        {loader && <Loader />}
      </NavigationContainer>
    </>
  );
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="RoleSelection"
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const dispatch = useDispatch();
  const {role, defaultRoute, user} = useSelector(selectAppState);

  useEffect(() => {
    if (user.reset_link) {
      navigate('ResetPassword');
    }

    getCurrentLocation()
      .then((res: any) => {
        if (res.latitude) {
          dispatch(updateAppStates({location: res}));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Stack.Navigator
      // initialRouteName={defaultRoute ?? 'Tabs'}
      initialRouteName={defaultRoute ?? 'AddressForm'}
      screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen
        name={'Tabs'}
        // component={CustomerTabNavigator}
        component={role == 1 ? CustomerTabNavigator : TabNavigatorProvider}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          presentation: 'transparentModal',
        }}
      />

      {role == 1 && <Stack.Screen name="MyWallet" component={Wallet} />}
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="Started" component={Started} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="AddressForm" component={AddressForm} />

      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="FileList" component={FileList} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Filters" component={Filters} />

      <Stack.Screen name="CreateBooking" component={CreateBooking} />
      <Stack.Screen name="BookingNotes" component={BookingNotes} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
      <Stack.Screen name="Thankyou" component={Thankyou} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />

      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Notifications" component={Notifications} />

      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="Topup" component={Topup} />
      <Stack.Screen name="WithdrawDetails" component={WithdrawDetails} />
      <Stack.Screen name="Advance" component={Advance} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Content" component={StaticContent} />
    </Stack.Navigator>
  );
};

const CustomerTabNavigator = (props: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={e => <BottomTabs {...e} {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="BookingHistory" component={BookingHistory} />
      <Tab.Screen name="TrackView" component={TrackView} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
