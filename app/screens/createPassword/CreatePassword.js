import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import setPasswordRoute from "../../utils/api_routes/auth/setPassword";
import { Form, Spinner, Input, YStack, Button, styled } from "tamagui";
import {
  verticalScale as vs,
  horizontalScale as hs,
  moderateScale as ms,
} from "../../components/ui/Metrics";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const CreatePassword = ({ membership_id }) => {
  const [password, setPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [passMatch, setPassMatch] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const authCtx = useContext(AuthContext);

  const onPasswordSet = (text) => {
    setPassword({ ...password, password: text });
  };

  const onPasswordConfirm = (text) => {
    setPassword({ ...password, confirmPassword: text });
  };

  const validatePassword = () => {
    if (password.password === password.confirmPassword) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await setPasswordRoute({
        membership: membership_id,
        password: password.password,
      });
      // console.log(response.data);
      // authCtx.authenticate(response.data.Token);
      router.push("/(app)/sign-in");
      setPassword({ password: "", confirmPassword: "" });
    } catch (error) {
      // console.log(error);
      Alert.alert("Creation Error", "please try again later or contact admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <SafeAreaView />
      <View style={{ marginTop: vs(30) }}>
        <Text style={{ fontSize: ms(25) }} className="text-yellow-300">
          To Finish Up,
        </Text>
        <Text
          style={{ fontSize: ms(30), paddingTop: vs(10) }}
          className="font-semibold text-[#589E23]"
        >
          Create ****
        </Text>
      </View>
      <View style={{ marginTop: vs(60) }} className="flex-1 justify-center">
        <View className="text-center mx-auto">
          <Image
            source={require("../../../assets/ada1.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <Text
          style={{ fontSize: ms(20), marginTop: vs(20), marginBottom: vs(20) }}
          className="text-center font-semibold my-4 text-slate-800"
        >
          Set Password
        </Text>

        <Form onSubmit={handleSubmit}>
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
              onChangeText={onPasswordSet}
              value={password.password}
              placeholder="Enter Password"
              secureTextEntry
              color="#589E23"
            />
            <Input
              backgroundColor="#fff"
              padding="$4"
              size={"$6"}
              onChangeText={onPasswordConfirm}
              value={password.confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              color="#589E23"
            />
          </YStack>
          {!passMatch && (
            <Text className="text-red-500 text-sm">Passwords do not match</Text>
          )}
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
            disabled={password.password === "" || !passMatch}
          >
            <CustomButton
              icon={loading ? () => <Spinner /> : undefined}
              size="$5"
            >
              Set Password
            </CustomButton>
          </Form.Trigger>
        </Form>
      </View>
      <View>
        {/* <TextInput
          className="border-[1px] py-4 px-2 mb-7"
          style={""}
          onChangeText={onPasswordSet}
          value={password.password}
          placeholder="Enter Password"
          secureTextEntry
        /> */}
        <View>
          {/* <TextInput
            className="border-[1px] py-4 px-2"
            onChangeText={onPasswordConfirm}
            value={password.confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          /> */}
        </View>
      </View>
      {/* <TouchableOpacity
        className="bg-[#D18A0D]"
        onPress={handleSubmit}
        // onPress={() => {
        //   authCtx.authenticate("utrewqwrtyuwq"), router.navigate("/(app)/");
        // }}
        disabled={!passMatch}
      >
        <Text className="text-center text-white py-4 text-xl">
          Set Password
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CreatePassword;
