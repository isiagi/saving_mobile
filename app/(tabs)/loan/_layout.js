import { Stack } from "expo-router";
import { Button, Pressable, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Button title="Get Loan" />,
          title: "Loans",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable>
              <Text>Log Out</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="transaction"
        options={{ headerTitle: "All Transactions" }}
      />
    </Stack>
  );
}
