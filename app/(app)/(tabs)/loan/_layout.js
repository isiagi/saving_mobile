import { Stack, router } from "expo-router";
import { Button, Pressable, Text, TouchableHighlight } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerLeft: () => (
              <TouchableHighlight
                onPress={() => router.push("/(app)/(tabs)/loan/payment")}
                className="pl-5"
              >
                <Text className="text-[#D18A0D] font-bold">Loan Payments</Text>
              </TouchableHighlight>
            ),
            drawerLabel: "Loans",
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "#0D68D1",
            headerRight: () => (
              <Pressable className="pr-5">
                <Text className="text-[#D18A0D] font-bold">Log Out</Text>
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
          }}
        />
        <Drawer.Screen
          name="payment"
          options={{
            headerTitle: "Loan Payments",
            headerTitleAlign: "center",
            drawerLabel: "Loan Payments",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
