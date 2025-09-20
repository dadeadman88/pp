import { Dimensions } from "react-native";

// export const BASEURL = `http://192.168.100.67:8000/api/`
export const BASEURL = `https://ghostemployee.com/picture-prfct/public/api/`
export const MAP_KEY = `AIzaSyAjtw2mzczF5xJZXNSFu6mVz2hCldHJX1U`;

export const COLORS = {
  primary: "#3FAF95",
  secondary: "#19A4B6",
  disable: "#989799",
  overlay: "#00000040",
  rating: "#F9C52F",
  black: "#000",
  white: "#fff",
  lightRed: "#eb8176",
  darkGray: "#898989",
  gray: "#989799",
  lightGray: "#c8c8cc",

  background: "#031D3B",
  label: "#999B9F",
  text: "#1D2733",

  online: "#6FC46F",
  offline: "#999B9F",
};

export const FONTS = {
  PoppinsBold: "Poppins-Bold",
  PoppinsSemiBold: "Poppins-SemiBold",
  PoppinsRegular: "Poppins-Regular",
  PoppinsMedium: "Poppins-Medium",
};

export const FONTSIZE = {
  XL: 20,
  L: 18,
  M: 16,
  S: 14,
  XS: 12,
};

export const ANIM = {
  thankyou: require('./components/animations/thankyou.json')
}


export const IMAGES = {
  // Common Folder
  qr: require("./assets/images/qr.png"),
  avatar: require("./assets/images/common/default.png"),
  googleIcon: require("./assets/images/common/googleIcon.png"),
  facebookIcon: require("./assets/images/common/fbIcon.png"),
  appleIcon: require("./assets/images/common/appleIcon.png"),
  transactionIcon: require("./assets/images/transactionIcon.png"),
  
  male: require("./assets/images/male.png"),
  female: require("./assets/images/female.png"),

  bgSettings: require("./assets/images/settingBg.png"),
  bgOverlay: require("./assets/images/bgopacity.png"),
  bgTab: require("./assets/images/bgtab.png"),
  logo: require("./assets/images/logo.png"),
  image1: require("./assets/images/1.png"),
  image2: require("./assets/images/2.png"),
  image3: require("./assets/images/3.png"),
  image4: require("./assets/images/4.png"),
  image5: require("./assets/images/5.png"),
  image6: require("./assets/images/6.png"),
  image7: require("./assets/images/7.png"),

  banner: require("./assets/images/demo/homeBanner.png"),
  demo1: require("./assets/images/demo/demo1.png"),
  demo2: require("./assets/images/demo/demo2.png"),
  demo3: require("./assets/images/demo/demo3.png"),
  demo4: require("./assets/images/demo/demo4.png"),
  
  profile: require("./assets/images/settings/profile.png"),
  contactus: require("./assets/images/settings/contactus.png"),
  logout: require("./assets/images/settings/logout.png"),
  notification: require("./assets/images/settings/notification.png"),
  settings: require("./assets/images/settings/settings.png"),
  wallet: require("./assets/images/settings/wallet.png"),
};

export const screenHeight = (percent) => {
  const windowHeight = Dimensions.get("window").height;
  return (windowHeight * percent) / 100;
};

export const screenWidth = (percent) => {
  const windowWidth = Dimensions.get("window").width;
  return (windowWidth * percent) / 100;
};

export const STATUS = {
  in_progress: 'In Progress',
  pending: 'Pending',
  accepted: 'Accepted',
  completed: 'Completed',
}

export const DETAILS = [
  {
    ques: 'How many hours of the service would you like?',
    ans: '02',
  },
  {
    ques: 'How many events you want us to Shoot?',
    ans: '02',
  },
  {
    ques: 'Event details, and special notes?',
    ans: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

export const PAYMENTS = [
  {
    key: 'Amount',
    value: 'USD 262.12',
  },{
    key: 'Discount',
    value: 'USD 0',
  },{
    key: 'Taxes & Services Fees',
    value: 'USD 0',
  },
];

export const SERVICES = [
  'Photographer',
  'Videographer',
  'Editor',
  'Light Man',
  'Weddings',
  'Headshots',
  'Portraits',
  'Real Estate',
  'Fashion Photography',
];