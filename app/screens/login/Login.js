import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import login from "../../utils/api_routes/auth/login";
import { Button, Form, Spinner, styled, Input, YStack } from "tamagui";
import {
  verticalScale as vs,
  moderateScale as ms,
} from "../../components/ui/Metrics";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const Login = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = useState("off");

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
      setStatus("submitting");
      const response = await login(loginData);

      console.log(response.data.Token);
      authCtx.authenticate(response.data.Token, response.data.User.id);
      setPassword("");
      setText("");
      router.navigate("/(app)/");
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Authentication Error",
        "Please check credentials Or Contact Admin"
      );
      setPassword("");
      setText("");
    } finally {
      setStatus("off");
    }
  };

  return (
    <View className="flex-1 px-5 bg-white">
      <SafeAreaView />
      <View style={{ marginTop: vs(50) }}>
        <Text className="text-3xl">Welcome To</Text>
        <Text
          style={{ fontSize: ms(30), paddingTop: vs(10) }}
          className="font-semibold text-[#589E23]"
        >
          Agalyawamu App
        </Text>
      </View>
      <View className="justify-center flex-1">
        <Text
          style={{ fontSize: ms(20) }}
          className="text-center font-semibold text-slate-800"
        >
          Login
        </Text>

        <Form onSubmit={handleLogIn}>
          <YStack
            width={"100%"}
            minHeight={200}
            overflow="hidden"
            space="$2"
            padding="$2"
            marginTop="$2"
            gap="$2"
            backgroundColor="#fff"
          >
            <Input
              backgroundColor="#fff"
              padding="$4"
              size={"$6"}
              onChangeText={onChangeText}
              value={text}
              placeholder={"Membership ID"}
              color="#589E23"
            />
            <Input
              backgroundColor="#fff"
              padding="$4"
              size={"$6"}
              onChangeText={onPassword}
              value={password}
              placeholder={"Password"}
              color="#589E23"
            />
            <Pressable
              style={{ marginBottom: vs(10) }}
              onPress={() => router.navigate("/(app)/member")}
            >
              <Text className="text-[#589E23]">Or Register</Text>
            </Pressable>
          </YStack>
          {/* <View className="mt-8">
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
          </View> */}
          {/* <TouchableOpacity className="bg-[#D18A0D]" onPress={handleLogIn}>
          <Text className="text-center text-white py-4 text-xl">Login</Text>
        </TouchableOpacity> */}
          <Form.Trigger
            asChild
            disabled={text === "" || password === "" || status !== "off"}
          >
            <CustomButton
              icon={status === "submitting" ? () => <Spinner /> : undefined}
              size="$5"
            >
              Log In
            </CustomButton>
          </Form.Trigger>
        </Form>
      </View>
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
