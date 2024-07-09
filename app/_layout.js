import { Slot } from "expo-router";

import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import AuthContextProvider from "./store/ctx";
import DataContextProvider from "./store/dataCtx";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthContextProvider>
      <DataContextProvider>
        <TamaguiProvider config={config}>{<Slot />}</TamaguiProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
