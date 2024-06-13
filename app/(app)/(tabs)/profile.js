import {
  ActivityIndicator,
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
import useGetById from "../../hooks/useGetById";

const Page = () => {
  const authCtx = useContext(AuthContext);
  const { authId } = useContext(AuthContext);

  const [data, isLoading] = useGetById("user_profile/profile", authId);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );

  console.log(data, "user");

  const image_url = data[0] && data[0].image_url;

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
            style={{ width: 130, height: 130, borderRadius: 50 }}
            source={{
              uri: image_url || "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <Text className="text-white text-4xl pt-5">
            {data[0] && data[0].user.last_name}
          </Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl">
        <View className=" px-5 pt-7">
          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Membership No. :{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].user.username}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              First Name :{" "}
            </Text>
            <Text className="text-xl">
              {data[0] && data[0].user.first_name}
            </Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Last Name :{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].user.last_name}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">NIN: </Text>
            <Text className="text-xl">3VvYh@example.com</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Email:{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].user.email}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Place of Residence:{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].residence}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Occupation:{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].occupation}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Gender:{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].gender}</Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-[#0D68D1] text-xl font-semibold">
              Phone:{" "}
            </Text>
            <Text className="text-xl">{data[0] && data[0].telephone}</Text>
          </View>

          <Pressable onPress={authCtx.logout}>
            <View className="flex-row items-center justify-center mt-10 py-4 bg-[#D18A0D] rounded-xl">
              {isLoading && (
                <View>
                  <ActivityIndicator size={"small"} />
                </View>
              )}
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
