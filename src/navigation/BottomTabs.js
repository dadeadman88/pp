import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, ImageBackground } from "react-native";
import { COLORS, IMAGES } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  FeedIcon,
  HeartIcon,
  HomeIcon,
  LocationIcon,
  MessageIcon,
  ProfileIcon,
} from "../components/tabIcons";
import { Typography } from "../components/atoms";
import WalletIcon from "../components/tabIcons/WalletIcon";
import { selectAppState } from "../store/selectors/appSelector";

const BottomTabs = (props) => {
  const dispatch = useDispatch();
  const { role } = useSelector( selectAppState );

  useEffect(() => {
    props.navigation.setOptions({tabBarVisible: false})
  }, [])
  
  return (
    <ImageBackground style={[styles.tabContainer]} source={IMAGES.bgTab}>
      {(role == 1 ? CUSTOMERTABS : PROVIDERTABS).map((i, index) => {
        const isActive = i.key === props.state.index;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tabView}
            onPress={() => {
              props.navigation.navigate('Tabs', {
                screen: i.navigateTo
              })
            }}
          >
            <View
              style={{
                top: index == 2 ? -30 : 0,
              }}
            >
              {isActive ? i.imageActive : i.image}
            </View>
            { index !== 2 && <Typography children={i.title} size={8} textType="light" color={ isActive ? COLORS.primary : COLORS.darkGray } style={{marginTop: 3}} />}
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: '#00000000',
    elevation: 0,
  },
  tabView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        paddingBottom: 10,
        height: 70,
      },
      android: {
        paddingBottom: 10,
        height: 70,
      },
      default: {
        height: 70,
      },
    }),
  },
});

const PROVIDERTABS = [
  {
    key: 1,
    title: "Bookings",
    navigateTo: "BookingHistory",
    image: <FeedIcon />,
    imageActive: <FeedIcon color={COLORS.primary} />,
  },
  {
    key: 2,
    title: "Wallet",
    navigateTo: "MyWallet",
    image: <WalletIcon />,
    imageActive: <WalletIcon color={COLORS.primary} />,
  },
  {
    key: 0,
    title: "Home",
    navigateTo: "Home",
    image: <HomeIcon />,
    imageActive: <HomeIcon color={COLORS.primary} />,
  },
  {
    key: 3,
    title: "Messages",
    navigateTo: "Messages",
    image: <MessageIcon />,
    imageActive: <MessageIcon color={COLORS.primary} />,
  },
  {
    key: 4,
    title: "Profile",
    navigateTo: "Settings",
    image: <ProfileIcon />,
    imageActive: <ProfileIcon color={COLORS.primary} />,
  },
];



const CUSTOMERTABS = [
  {
    key: 1,
    title: "Bookings",
    navigateTo: "BookingHistory",
    image: <FeedIcon />,
    imageActive: <FeedIcon color={COLORS.primary} />,
  },
  {
    key: 2,
    title: "Map",
    navigateTo: "TrackView",
    image: <LocationIcon />,
    imageActive: <LocationIcon color={COLORS.primary} />,
  },
  {
    key: 0,
    title: "Home",
    navigateTo: "Home",
    image: <HomeIcon />,
    imageActive: <HomeIcon color={COLORS.primary} />,
  },
  {
    key: 3,
    title: "Messages",
    navigateTo: "Messages",
    image: <MessageIcon />,
    imageActive: <MessageIcon color={COLORS.primary} />,
  },
  {
    key: 4,
    title: "Profile",
    navigateTo: "Settings",
    image: <ProfileIcon />,
    imageActive: <ProfileIcon color={COLORS.primary} />,
  },
];
