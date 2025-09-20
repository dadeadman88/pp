import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
import { InputText } from "../components/atoms";
import SafeAreaContainer from "../containers/SafeAreaContainer";
import { TransparentHeader } from "../components/headers/TransparentHeader";
import { Button } from "../components/atoms/Button";

const ChangePassword = (props: any) => {
  const inputRef: any = useRef([]);
  const [errors, setErrors]: any = useState({});

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);

//   const _onUpdate = () => {
//     const input = {old_password: password, new_password: newPassword, confirm_new_password: confirmPassword};
//     validate(input).then((err) => {
//       setErrors(err);
//       if (err && Object.keys(err).length) return;
//       changePasswordApi(input);
//     });
//   }

  return (
    <SafeAreaContainer safeArea={true} mode="light">
      <TransparentHeader title={"Change Password"} color={'#000'} />

      <View style={{ padding: 20 }}>
        <InputText
          label={"Current Password"}
          placeholder={"********"}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          error={errors.password}
          errorColor={'red'}
          keyboardType={"default"}
          inputRef={(e) => (inputRef["password"] = e)}
          style={{ marginBottom: 20 }}
          returnKeyType={"next"}
          onSubmitEditing={() => inputRef["new_password"].focus()}
          secureTextEntry={secureEntry}
        />
        <InputText
          label={"New Password"}
          placeholder={"********"}
          onChangeText={(text: any) => setNewPassword(text)}
          value={newPassword}
          error={errors.new_password}
          errorColor={'red'}
          keyboardType={"default"}
          inputRef={(e) => (inputRef["new_password"] = e)}
          style={{ marginBottom: 20 }}
          returnKeyType={"next"}
          onSubmitEditing={() => inputRef["confirm_password"].focus()}
          secureTextEntry={secureEntry}
          
        />
        <InputText
          label={"Confirm Password"}
          placeholder={"********"}
          onChangeText={(text: any) => setConfirmPassword(text)}
          value={confirmPassword}
          error={errors.confirm_new_password}
          errorColor={'red'}
          keyboardType={"default"}
          returnKeyType={"done"}
          inputRef={(e) => (inputRef["confirm_password"] = e)}
          style={{ marginBottom: 20 }}
          onSubmitEditing={() => Keyboard.dismiss()}
          secureTextEntry={secureEntry}
        />

        <Button label={"Submit"} style={{ marginTop: 20 }} onPress={()=>{}} />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default ChangePassword;
