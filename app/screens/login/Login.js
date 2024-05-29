import { View, Text, Button, TextInput, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import login from "../../utils/api_routes/auth/login";

const Login = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authCtx = useContext(AuthContext);

  const onChangeText = (text) => {
    setText(text);
  };

  const onPassword = (text) => {
    setPassword(text);
  };

  const handleLogIn = async () => {
    const loginData = {
      Member_Id: text,
      Password: password,
    };

    console.log(loginData);
    try {
      const response = await login(loginData);

      console.log(response.data.Token);
      authCtx.authenticate(response.data.Token);
      setPassword("");
      setText("");
      router.navigate("/(app)/");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication Error",
        "Please check credentials Or Contact Admin"
      );
      setPassword("");
      setText("");
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
        Login
      </Text>

      <View className="mt-8">
        <TextInput
          className="border-[1px] py-4 px-2 mb-7 text-xl"
          style={""}
          onChangeText={onChangeText}
          value={text}
          placeholder="Membership ID"
        />
        <View className="mb-7">
          <TextInput
            className="border-[1px] py-4 px-2 text-xl"
            onChangeText={onPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          <Pressable
            className="mt-2"
            onPress={() => router.navigate("/(app)/member")}
          >
            <Text className="text-[#0D68D1]">Or Register</Text>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity className="bg-[#D18A0D]" onPress={handleLogIn}>
        <Text className="text-center text-white py-4 text-xl">Login</Text>
      </TouchableOpacity>
      {/* <Button
        onPress={() => {
          authCtx.authenticate("utrewqwrtyuwq"), router.navigate("/(app)/");
        }}
        title="Login"
        style={{ padding: "300px" }}
      /> */}
    </View>
  );
};

export default Login;
