import { Slot } from "expo-router";

import "../global.css";
import AuthContextProvider from "./store/ctx";

export default function Layout() {
  return <AuthContextProvider>{<Slot />}</AuthContextProvider>;
}
