import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();

import BottomTabs from "./BottomTabs";
import BookingHistory from "../screens/BookingHistory";
import Messages from "../screens/Messages";
import Settings from "../screens/Settings";
import Home from "../screens/provider/Home";
import Wallet from "../screens/provider/Wallet";

const TabNavigatorProvider = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(e) => <BottomTabs {...e} {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="BookingHistory" component={BookingHistory} />
      <Tab.Screen name="MyWallet" component={Wallet} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigatorProvider;