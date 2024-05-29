import { Stack } from "expo-router";
import { Button, Pressable, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Button color={"#D18A0D"} className="p-10" title="Get Loan" />
          ),
          title: "LOANS",
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
          headerTitle: "All Transactions",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
