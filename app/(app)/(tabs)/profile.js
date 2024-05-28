import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "../../store/ctx";

const Page = () => {
  const authCtx = useContext(AuthContext);
  return (
    <View className="flex flex-1 bg-blue-500">
      <SafeAreaView />
      <View className="items-center py-10">
        <View className="text-center">
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text className="text-white text-4xl">Geofrey Isiagi</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl">
        <View className=" px-5 pt-10">
          <View className="flex-row justify-between py-4">
            <Text>Membership No. : </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>NIN: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Email: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Place of Residence: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text>Occupation: </Text>
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

          <Pressable onPress={authCtx.logout}>
            <View className="flex-row justify-center mt-10 py-4 bg-blue-500">
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
