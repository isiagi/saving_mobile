import React, { useContext, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { AuthContext } from "../../store/ctx";

export default function TabLayout() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) return <Redirect href="/(app)/sign-in" />;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saving"
        options={{
          title: "Saving",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="dollar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loan"
        options={{
          title: "Loan",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
