import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import SavingInterest from "./SavingInterest";
import Bottom from "./ui/bottomSheet/BottomSheet";
import { router } from "expo-router";

const Page = ({ title }) => {
  return (
    <View className="flex-1 overflow-hidden">
      <View className="relative mb-20">
        <View className="bg-slate-800 p-20 items-center">
          <Text className="text-white text-3xl max-w-[200px] text-center">
            Your Agalyawamu {title}
          </Text>
        </View>
        {/* TODO */}
        {/* center balance, border-radius */}

        <View className="bg-red-400 w-[500px] overflow-hidden p-7 mx-5 absolute -bottom-[calc(100%/4)] border-r-[10px]">
          <View>
            <Text>Loan Balance</Text>
            <Text>300,000</Text>
          </View>
        </View>
      </View>
      {/* <SavingInterest /> */}

      {/* <Link href="/">Home</Link> */}
      <View className="mx-5 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl">Previous {title} Payments</Text>
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
            <Text>View All</Text>
          </Pressable>
        </View>
      </View>
      <Bottom />
    </View>
  );
};

export default Page;
