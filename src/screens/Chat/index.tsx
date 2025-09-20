import React, { useState, createRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  StyleSheet,
  Platform,
} from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS, FONTS, IMAGES } from "../../constants";
import { Typography } from "../../components/atoms";
import SafeAreaContainer from "../../containers/SafeAreaContainer";

const Chat = (props) => {
  const [value, setValue] = useState("");
  const msgListRef = createRef();

  const onSend = () => {
    if (!value.length) return;
    setValue("");
  };

  const RenderHeader = () => (
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => props.navigation.goBack() }>
        <FaIcon name={'arrow-left'} color={'#000'} size={16} />
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
      >
        <Image
          source={IMAGES.avatar}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
        <View>
          <Typography children={"James Smith"} size={16} />
          <Typography
            children={"Last seen 15 min ago"}
            size={12}
            textType={"light"}
          />
        </View>
      </View>
    </View>
  );

  const messageInput = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <View style={styles.chatKeyboard}>
          <TextInput
            style={styles.input}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            blurOnSubmit={true}
            value={value}
            onChangeText={(text) => setValue(text)}
            returnKeyType="done"
            multiline={true}
            placeholder="Type your message...."
            placeholderTextColor={COLORS.lightGray}
            keyboardType="default"
          />
          <TouchableOpacity
            onPress={() => onSend()}
            activeOpacity={0.8}
            style={{
              paddingVertical: 5,
              alignSelf: "flex-end",
            }}
          >
            <IonIcon name="send" color={COLORS.primary} size={26} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

  const chatBubble = ({ item }: any) => {
    const mine = !item.mine;

    return (
      <View
        key={item.id}
        style={[
          styles.msgView,
          mine
            ? {
                borderBottomRightRadius: 0,
                backgroundColor: COLORS.primary,
                alignSelf: "flex-end",
              }
            : {
                borderBottomLeftRadius: 0,
                backgroundColor: "#ECF2FF",
                alignSelf: "flex-start",
              },
        ]}
      >
        <Typography color={!mine ? COLORS.black : "#fff"} textType={"light"}>
          {item.message}
        </Typography>
        <Typography
          textType="light"
          size={10}
          color={COLORS.darkGray}
          style={{
            position: "absolute",
            bottom: -15,
            right: 0,
          }}
        >
          {item.created_at}
        </Typography>
      </View>
    );
  };

  return (
    <SafeAreaContainer safeArea={true} mode="light">
      <RenderHeader />

      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={MESSAGS}
        renderItem={chatBubble}
        ref={msgListRef}
        showsVerticalScrollIndicator={false}
        inverted
      />
      { messageInput() }
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
  },
  msgView: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical: 12,
    borderRadius: 8,
    maxWidth: "80%",
  },
  chatKeyboard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    marginTop: 10,
    borderTopColor: "#E8E8E8",
  },
  inputView: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: FONTS.PoppinsRegular,
    textTransform: "capitalize",
    borderColor: "gray",
    justifyContent: "center",
    maxHeight: 150,
  },
  input: {
    fontFamily: FONTS.PoppinsRegular,
    flex: 1,
    color: COLORS.text,
    padding: 0
  },
});
export default Chat;

const MESSAGS = [
  {
    id: 4,
    message: "Hmm, everything is fine",
    created_at: "14:02",
    mine: true,
  },
  {
    id: 3,
    message: "I am doing great! How are you today?",
    created_at: "14:02",
  },
  {
    id: 2,
    message: "Hello! Castro",
    created_at: "14:02",
  },
  {
    id: 1,
    message: "Hello! What’s up?",
    created_at: "14:02",
    mine: true,
  },
];
