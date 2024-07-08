import { Slot } from "expo-router";

import "../global.css";
import AuthContextProvider from "./store/ctx";
import DataContextProvider from "./store/dataCtx";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

export default function Layout() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <TamaguiProvider config={config}>{<Slot />}</TamaguiProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
