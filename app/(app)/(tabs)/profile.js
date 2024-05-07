import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Page = () => {
  return (
    <View className="flex flex-1 bg-red-400">
      <SafeAreaView />
      <View className="items-center py-10">
        <View className="text-center">
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text>Geofrey Isiagi</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl">
        <View className=" px-5 pt-10">
          <View className="flex-row justify-between py-4">
            <Text>Membership No. : </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Email: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Date Of Birth: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Gender: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Phone: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <Pressable>
            <View className="flex-row justify-center mt-10 py-4 bg-red-400">
              <Text className="text-center text-xl text-white">Log Out</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
