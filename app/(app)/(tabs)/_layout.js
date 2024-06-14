import React, { useContext, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { AuthContext } from "../../store/ctx";
import { Text, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) return <Redirect href="/(app)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E7D37F",
        tabBarIconStyle: {
          backgroundColor: "#9E6623",
        },
        tabBarInactiveTintColor: "#81A263",
        tabBarStyle: {
          backgroundColor: "#365E32",
        },
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
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
          unmountOnBlur: true,
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
      <Tabs.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
          href: null,
          headerRight: () => (
            <TouchableOpacity>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
