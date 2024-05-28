import { View, Text } from "react-native";
import React from "react";
import CreatePassword from "../screens/createPassword/CreatePassword";
import { router, useLocalSearchParams } from "expo-router";

const setPassword = () => {
  const { membership_id } = useLocalSearchParams();
  console.log("params", membership_id);
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <CreatePassword membership_id={membership_id} />
    </React.Suspense>
  );
};

export default setPassword;
