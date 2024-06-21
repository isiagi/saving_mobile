import { View, Text } from "react-native";
import React from "react";
import OtpScreen from "../screens/otp/Otp";
import { useLocalSearchParams } from "expo-router";

const Otp = () => {
  const { membership_id } = useLocalSearchParams();
  return <OtpScreen membership_id={membership_id} />;
};

export default Otp;
