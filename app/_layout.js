import { Slot, useRouter } from "expo-router";

import "../global.css";
import AuthContextProvider from "./store/ctx";
import DataContextProvider from "./store/dataCtx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkOnBoarding = async () => {
      try {
        const doneBoarding = await AsyncStorage.getItem("onBoarding");
        console.log("doneBoarding", doneBoarding);
        if (doneBoarding !== null) {
          router.replace("/(app)/(tabs)");
        } else {
          router.replace("/(app)/board");
        }
      } catch (error) {
        console.error("Failed to check onboarding status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnBoarding();
  }, []);

  if (isLoading) {
    return null; // or a loading indicator
  }
  return (
    <AuthContextProvider>
      <DataContextProvider>{<Slot />}</DataContextProvider>
    </AuthContextProvider>
  );
}
