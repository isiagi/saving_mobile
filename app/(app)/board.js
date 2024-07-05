import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import { router, useRootNavigationState } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoarding = () => {
  const onDone = () => {
    router.push("/(app)/(tabs)");
    AsyncStorage.setItem("onBoarding", "true");
  };

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/ada.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/ada.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
      // onDone nivagate to (tabs)
      onDone={onDone}
      showSkip={false}
    />
  );
};

export default OnBoarding;
