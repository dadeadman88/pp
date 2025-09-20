import { Platform, StyleSheet } from "react-native";
import { COLORS, FONTS, screenHeight } from "./constants";

export const commonStyles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: Platform.OS == "ios" ? 50 : undefined,
  },
  flexRowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  justifyContentBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  justifyCenter: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardWithShadow: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.11,
    shadowRadius: 4,
    elevation: 4,
  },
  // PAID & UNPAID DOT
  dotView: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  // COMMON INPUTTEXT & INPUTVIEW STYLES
  inputView: {
    paddingVertical: Platform.OS == "ios" ? screenHeight(1.5) : 0,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EBEBEB',
    paddingHorizontal: 10,
    gap: 5
  },
  iconView: {
    marginRight: 10,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  // NOTIFICATON POP CARD
  popupCard: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 99,
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  lineBarStyle: {
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    height: 1,
    opacity: 0.5,
  },
  inputTextStyle: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: FONTS.PoppinsRegular,
  },
});
