import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="transaction"
        options={{ headerTitle: "All Transactions" }}
      />
    </Stack>
  );
}
