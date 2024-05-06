import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Your Savings",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable>
              <Text>Log Out</Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
