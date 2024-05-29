import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import SavingInterest from "./SavingInterest";
import Bottom from "./ui/bottomSheet/BottomSheet";
import { router } from "expo-router";

const Page = ({ title }) => {
  return (
    <View className="flex-1 overflow-hidden bg-[#2D5C91]">
      <StatusBar barStyle={"dark-content"} />
      <View className=" mb-10 flex">
        <View className=" py-12 items-center">
          <Text className="text-white text-3xl max-w-[200px] text-center">
            Your {title}
          </Text>
        </View>

        <View className="bg-[#D18A0D] self-center p-7 overflow-hidden w-[80%] mx-auto my-0 rounded-xl">
          <View>
            <Text>Loan Balance</Text>
            <Text>300,000</Text>
          </View>
        </View>
      </View>
      {/* <SavingInterest /> */}

      {/* <Link href="/">Home</Link> */}
      <View className="px-5 py-7 flex-row justify-between items-center bg-white rounded-tr-[30px] rounded-tl-[30px]">
        <View>
          <Text className="text-2xl text-[#0D68D1]">
            Previous {title} Payments
          </Text>
          <Text>Today, May 4</Text>
        </View>
        <View>
          <Pressable
            onPress={() => router.navigate("/(tabs)/loan/transaction")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "white",
              },
              { padding: 6, borderRadius: 4 },
            ]}
          >
            <Text className="text-[#D18A0D] font-semibold">View All</Text>
          </Pressable>
        </View>
      </View>
      <Bottom />
    </View>
  );
};

export default Page;
