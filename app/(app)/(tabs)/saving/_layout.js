import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "SAVINGS",
          headerTitleAlign: "center",
          headerTintColor: "#0D68D1",
          headerRight: () => (
            <Pressable>
              <Text className="text-[#D18A0D] font-semibold">Log Out</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="transaction"
        options={{
          headerTitle: "All Savings Transactions",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
