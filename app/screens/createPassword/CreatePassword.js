import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import setPasswordRoute from "../../utils/api_routes/auth/setPassword";

const CreatePassword = ({ membership_id }) => {
  const [password, setPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [passMatch, setPassMatch] = React.useState(true);

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
      const response = await setPasswordRoute({
        membership: membership_id,
        password: password.password,
      });
      console.log(response.data);
      // authCtx.authenticate(response.data.Token);
      router.push("/(app)/sign-in");
      setPassword({ password: "", confirmPassword: "" });
    } catch (error) {
      console.log(error);
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
        Set Password
      </Text>

      <View className="mt-8">
        <TextInput
          className="border-[1px] py-4 px-2 mb-7"
          style={""}
          onChangeText={onPasswordSet}
          value={password.password}
          placeholder="Enter Password"
          secureTextEntry
        />
        <View className="mb-7">
          <TextInput
            className="border-[1px] py-4 px-2"
            onChangeText={onPasswordConfirm}
            value={password.confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
          {!passMatch && (
            <Text className="text-red-500 text-sm">Passwords do not match</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default CreatePassword;
