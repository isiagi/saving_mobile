import { Stack, router } from "expo-router";
import { Button, Pressable, Text, TouchableHighlight } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
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
            headerRight: () => (
              <TouchableHighlight
                onPress={() => router.push("/(app)/(tabs)/loan/payment")}
                className="pr-5"
              >
                <Text className="text-[#589E23] font-bold">Loan Payments</Text>
              </TouchableHighlight>
            ),
            drawerLabel: "Loans",
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "#0F0F0F",
            headerLeft: () => (
              <Pressable className="pl-5">
                <Text className="text-[#589E23] font-bold">GET LOAN</Text>
              </Pressable>
            ),
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="transaction"
          options={{
            headerTitle: "All Loans Transactions",
            headerTitleAlign: "center",
            drawerLabel: "All Loans Transactions",
            headerTintColor: "#0F0F0F",
          }}
        />
        <Drawer.Screen
          name="payment"
          options={{
            headerTitle: "Loan Payments",
            headerTitleAlign: "center",
            drawerLabel: "Loan Payments",
            headerTintColor: "#0F0F0F",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
