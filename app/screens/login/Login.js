import { View, Text, Button, TextInput } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";

const Login = () => {
  const [text, onChangeText] = React.useState("");

  const authCtx = useContext(AuthContext);

  return (
    <View className="flex-1 px-5">
      <SafeAreaView />
      <View className="my-8">
        <Text className="text-3xl">To Get</Text>
        <Text className="text-5xl pt-3 font-semibold">Started</Text>
      </View>
      <Text className="text-center text-3xl font-semibold my-4">Login</Text>

      <View className="mt-8">
        <TextInput
          className="border-[1px] py-3 px-2"
          style={""}
          onChangeText={onChangeText}
          value={""}
          placeholder="Membership ID"
        />
        <TextInput
          className="border-[1px] py-3 px-2 my-7"
          onChangeText={onChangeText}
          value={""}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Button
        onPress={() => {
          authCtx.authenticate("utrewqwrtyuwq"), router.navigate("/(app)/");
        }}
        title="Login"
        style={{ padding: "300px" }}
      />
    </View>
  );
};

export default Login;
