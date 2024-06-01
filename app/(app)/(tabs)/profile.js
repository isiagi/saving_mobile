import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";

const Page = () => {
  const authCtx = useContext(AuthContext);
  return (
    <ScrollView className="flex-1 bg-[#2D5C91]">
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView />
      <TouchableOpacity
        onPress={() => router.navigate("editProfile")}
        className="bg-[#D18A0D] w-[100px] py-2 mx-5 rounded-xl self-end"
      >
        <Text className="text-center text-xl text-white">Edit Profile</Text>
      </TouchableOpacity>
      <View className="items-center py-10">
        <View className="text-center items-center">
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text className="text-white text-4xl pt-5">Geofrey Isiagi</Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl">
        <View className=" px-5 pt-7">
          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Membership No. :{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">NIN: </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Email:{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Place of Residence:{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Occupation:{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Gender:{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Phone:{" "}
            </Text>
            <Text>3VvYh@example.com</Text>
          </View>

          <Pressable onPress={authCtx.logout}>
            <View className="flex-row justify-center mt-10 py-4 bg-[#D18A0D] rounded-xl">
              <Text className="text-center text-xl text-white">Log Out</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
