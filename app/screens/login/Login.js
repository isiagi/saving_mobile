import { View, Text, Button } from "react-native";
import React from "react";

const Login = () => {
  return (
    <View>
      <Text>To Get Started</Text>

      <Text>Login</Text>

      <View>
        <TextInput
          style={""}
          onChangeText={""}
          value={""}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <TextInput
          style={""}
          onChangeText={""}
          value={""}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
      <Button title="Login" />
    </View>
  );
};

export default Login;
