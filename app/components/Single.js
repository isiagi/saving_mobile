import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import SavingInterest from "./SavingInterest";
import Bottom from "./ui/bottomSheet/BottomSheet";
import { router, usePathname } from "expo-router";

const Page = ({ title, data, isLoading }) => {
  const tabPath = usePathname();

  const toRoute = tabPath.split("/")[1];

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle={"dark-content"} />
      <View className=" mb-11 flex">
        <View className=" py-10 items-center">
          <Text className="text-[#0F0F0F] text-3xl max-w-[200px] text-center">
            Your {title}
          </Text>
        </View>

        <View className="bg-[#589E23] self-center p-5 overflow-hidden w-[60%] mx-auto my-0 rounded-xl">
          <View className="flex-row justify-center items-center ">
            <View>
              <Text className="text-white text-lg text-center">
                {title} Balance
              </Text>
              <Text className="text-white text-3xl mt-2">300,000 UGX</Text>
            </View>
            {/* <View className="">
              {toRoute === "loan" && (
                <Button className="h-fit" title="Get Loan">
                  Get Loan
                </Button>
              )}
            </View> */}
          </View>
        </View>
      </View>
      {/* <SavingInterest /> */}

      {/* <Link href="/">Home</Link> */}
      <View className="px-5 py-7 flex-row justify-between items-center bg-white rounded-tr-[30px] rounded-tl-[30px]">
        <View>
          <Text className="text-2xl text-[#0F0F0F]">Previous {title}</Text>
          <Text className="text-[#708090]">Today, May 4</Text>
        </View>
        <View>
          <Pressable
            onPress={() => router.navigate(`/(tabs)/${toRoute}/transaction`)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "white",
              },
              { padding: 6, borderRadius: 4 },
            ]}
          >
            <Text className="text-[#589E23] font-bold">View All</Text>
          </Pressable>
        </View>
      </View>
      <Bottom data={data} isLoading={isLoading} />
    </View>
  );
};

export default Page;
