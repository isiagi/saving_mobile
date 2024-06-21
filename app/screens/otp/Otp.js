import OtpTextInput from "react-native-text-input-otp";
import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import API from "../../utils/api/base";
import { router } from "expo-router";

const OtpScreen = ({ membership_id }) => {
  const [otp, setOtp] = React.useState("");

  console.log(otp);
  const handlePress = async () => {
    try {
      const res = await API.post("auth/validate_otp/", { membership_id, otp });
      console.log(res);
      router.replace({
        pathname: "/(app)/set-password",
        params: { membership_id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-5">
      <OtpTextInput otp={otp} setOtp={setOtp} digits={5} />
      <Pressable onPress={handlePress}>
        <Text className="bg-blue-500 mt-10 p-4 text-white">Submit</Text>
      </Pressable>
    </View>
  );
};

export default OtpScreen;
