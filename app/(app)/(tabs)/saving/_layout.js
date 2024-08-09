import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContext } from "../../../store/ctx";

export default function Layout() {
  const authCtx = useContext(AuthContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveBackgroundColor: "#589E23",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#0F0F0F",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "",
            headerTitleAlign: "center",
            headerTintColor: "#0F0F0F",
            headerRight: () => (
              <Pressable onPress={() => authCtx.logout()}>
                <Text className="text-red-400 font-bold mr-5">Log Out</Text>
              </Pressable>
            ),
            drawerLabel: "Saving",
          }}
        />
        <Drawer.Screen
          name="transaction"
          options={{
            headerTitle: "All Savings Transactions",
            headerTitleAlign: "center",
            drawerLabel: "All Saving Transactions",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="wagumbulizi"
          options={{
            headerTitle: "Wagubumbuzi Transactions",
            headerTitleAlign: "center",
            drawerLabel: "Wagubumbuzi",
            unmountOnBlur: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
