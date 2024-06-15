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
import { DataContext } from "../../store/dataCtx";
import Spinner from "react-native-loading-spinner-overlay";

const Page = () => {
  const authCtx = useContext(AuthContext);
  const { authId } = useContext(AuthContext);

  const [data, isLoading] = useGetById("user_profile/profile", authId);

  const { userData, isDataLoading } = useContext(DataContext);

  // if (isLoading)
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );

  const image_url = data[0] && data[0].image_url;

  return (
    <ScrollView className="flex-1">
      <StatusBar backgroundColor={"#fff"} />
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-5">
          <TouchableOpacity
            onPress={() => router.push("editProfile")}
            className="bg-[#589E23] w-[100px] py-2 mx-5 rounded-xl"
          >
            <Text className="text-center text-xl text-white">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-5">
            <Text className="text-[#589E23] text-xl font-bold">LogOut</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center py-10">
          <View className="text-center items-center">
            <Image
              style={{ width: 130, height: 130, borderRadius: 50 }}
              source={{
                uri: image_url || "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
            <Text className="text-[#0F0F0F] text-4xl pt-5">
              {data[0] && data[0].user.last_name}
            </Text>
          </View>
        </View>

        <View className="flex-1 bg-white rounded-t-3xl">
          <View className=" px-5 pt-7">
            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Membership No. :{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].user.username}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                First Name :{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].user.first_name}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Last Name :{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].user.last_name}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                NIN:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">3VvYh@example.com</Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Email:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].user.email}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Place of Residence:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].residence}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Occupation:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].occupation}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Gender:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].gender}
              </Text>
            </View>

            <View className="flex-row justify-between py-4">
              <Text className="text-[#0F0F0F] text-xl font-semibold">
                Phone:{" "}
              </Text>
              <Text className="text-xl text-[#708090]">
                {data[0] && data[0].telephone}
              </Text>
            </View>

            <Pressable onPress={authCtx.logout}>
              <View className="flex-row items-center justify-center mt-10 mb-10 py-4 bg-[#589E23] rounded-xl">
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
