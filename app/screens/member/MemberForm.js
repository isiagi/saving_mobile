import { View, Text, Button, TextInput, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import membership from "../../utils/api_routes/auth/member";

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
        pathname: "/(app)/set-password",
        params: { membership_id: response.data.User.membership_id },
      });

      // setText("");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Membership Id Failed",
        "Please check credentials Or Contact Admin"
      );
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
