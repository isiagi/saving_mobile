import { Slot } from "expo-router";

import "../global.css";
import AuthContextProvider from "./store/ctx";
import DataContextProvider from "./store/dataCtx";

export default function Layout() {
  return (
    <AuthContextProvider>
      <DataContextProvider>{<Slot />}</DataContextProvider>
    </AuthContextProvider>
  );
}
