import { View, Text, Button, TextInput, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import membership from "../../utils/api_routes/auth/member";
import axios from "axios";

const MembershipForm = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authCtx = useContext(AuthContext);

  const onChangeText = (text) => {
    setText(text);
  };

  const handleMember = async () => {
    try {
      const response = await membership({ membership_id: text });

      router.push({
        pathname: "/(app)/otp",
        params: { membership_id: response.data.User.membership_id },
      });

      // setText("");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // The error is an Axios error
        console.error("Axios error:", error);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Error config:", error.config);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);

          // Show an alert
          Alert.alert(
            "Request Failed",
            `Status Code: ${error.response.status}\nMessage: ${error.response.data.Error}`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request data:", error.request);

          // Show an alert for request error
          Alert.alert(
            "Network Error",
            "The request was made but no response was received."
          );
        }
      } else {
        // The error is not an Axios error
        console.error("Error:", error);

        // Show a generic alert for other errors
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <View className="flex-1 px-5 bg-white">
      <SafeAreaView />
      <View className="my-8">
        <Text className="text-3xl">To Get</Text>
        <Text className="text-5xl pt-3 font-semibold">Started</Text>
      </View>
      <Text className="text-center text-3xl font-semibold my-4 text-[#0D68D1]">
        Membership ID
      </Text>

      <View className="mt-8">
        <TextInput
          className="border-[1px] py-4 px-2 mb-7"
          style={""}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Membership ID"
        />
      </View>
      <TouchableOpacity
        className="bg-[#D18A0D]"
        // onPress={() => router.navigate("/(app)/set-password")}
        onPress={handleMember}
      >
        <Text className="text-center text-white py-4 text-xl">
          Submit Membership Id
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MembershipForm;
