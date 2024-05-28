import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="member" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="set-password" options={{ headerTitle: "Back" }} />
    </Stack>
  );
}
