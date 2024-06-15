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
          headerTintColor: "#0F0F0F",
          headerRight: () => (
            <Pressable>
              <Text className="text-[#589E23] font-bold">Log Out</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="transaction"
        options={{
          headerTitle: "All Savings Transactions",
          headerTitleAlign: "center",
          unmountOnBlur: true,
        }}
      />
    </Stack>
  );
}
