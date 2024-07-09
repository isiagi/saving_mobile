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
import { Form, styled, Button } from "tamagui";
import {
  verticalScale as vs,
  horizontalScale as hs,
  moderateScale as ms,
} from "../../components/ui/Metrics";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

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
        <View
          style={{ marginTop: vs(30) }}
          className="flex-row justify-between items-center"
        >
          <TouchableOpacity
            onPress={() => router.push("editProfile")}
            style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
            className="bg-[#589E23] w-[100px]  mx-5 rounded-xl"
          >
            <Text
              style={{ fontSize: ms(15) }}
              className="text-center  text-white"
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-5">
            <Text
              style={{ fontSize: ms(15) }}
              className="text-[#589E23]  font-medium"
            >
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ paddingTop: vs(35), paddingBottom: vs(35) }}
          className="items-center"
        >
          <View className="text-center items-center">
            <Image
              style={{ width: hs(100), height: vs(100), borderRadius: ms(50) }}
              source={{
                uri: image_url || "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
            <Text
              style={{ fontSize: ms(25), paddingTop: vs(10) }}
              className="text-[#0F0F0F]"
            >
              {data[0] && data[0].user.last_name}
            </Text>
          </View>
        </View>

        <View className="flex-1 bg-white rounded-t-3xl">
          <View
            style={{
              paddingTop: vs(20),
              paddingLeft: hs(20),
              paddingRight: hs(20),
              paddingBottom: vs(20),
            }}
          >
            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F] font-semibold"
              >
                Membership No. :{" "}
              </Text>
              <Text
                style={{ fontSize: ms(17) }}
                className="text-xl text-[#708090]"
              >
                {data[0] && data[0].user.username}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F] font-semibold"
              >
                First Name :{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].user.first_name}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Last Name :{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].user.last_name}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                NIN:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                3VvYh@example.com
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Email:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].user.email}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Place of Residence:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].residence}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Occupation:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].occupation}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Gender:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].gender}
              </Text>
            </View>

            <View
              style={{ paddingTop: vs(10), paddingBottom: vs(10) }}
              className="flex-row justify-between"
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#0F0F0F]  font-semibold"
              >
                Phone:{" "}
              </Text>
              <Text style={{ fontSize: ms(17) }} className=" text-[#708090]">
                {data[0] && data[0].telephone}
              </Text>
            </View>

            <Form onSubmit={authCtx.logout}>
              <Form.Trigger asChild>
                <CustomButton
                  size="$5"
                  icon={authCtx.isLoading ? () => <Spinner /> : undefined}
                >
                  Log Out
                </CustomButton>
              </Form.Trigger>
            </Form>

            {/* <Pressable onPress={authCtx.logout}>
              <View className="flex-row items-center justify-center mt-10 mb-10 py-4 bg-[#589E23] rounded-xl">
                {isLoading && (
                  <View>
                    <ActivityIndicator size={"small"} />
                  </View>
                )}
                <Text className="text-center text-xl text-white">Log Out</Text>
              </View>
            </Pressable> */}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
