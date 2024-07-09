import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import SavingInterest from "./SavingInterest";
import Bottom from "./ui/bottomSheet/BottomSheet";
import { router, usePathname } from "expo-router";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "./ui/Metrics";

const Page = ({ title, data, isLoading }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const tabPath = usePathname();

  const toRoute = tabPath.split("/")[1];

  useEffect(() => {
    if (data && data.length > 0) {
      const total = data.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
      );
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [data]);

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle={"dark-content"} />
      <View style={{ marginBottom: vs(50) }} className=" flex">
        <View
          style={{ marginTop: vs(30), marginBottom: vs(30) }}
          className="items-center"
        >
          <Text
            style={{ fontSize: ms(25) }}
            className="text-[#0F0F0F]  text-center"
          >
            Your {title}
          </Text>
        </View>

        <View
          style={{ paddingTop: vs(20), paddingBottom: vs(20) }}
          className="bg-[#589E23] self-center p-5 overflow-hidden w-[60%] mx-auto my-0 rounded-tl-3xl rounded-tr-lg rounded-br-3xl"
        >
          <View className="flex-row justify-center items-center ">
            <View>
              <Text
                style={{ fontSize: ms(15) }}
                className="text-white text-center"
              >
                {title} Balance
              </Text>
              <Text
                style={{ fontSize: ms(25) }}
                className="text-white text-3xl mt-2"
              >
                {totalAmount} UGX
              </Text>
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
      <View
        style={{
          paddingBottom: vs(20),
          paddingTop: vs(20),
          paddingLeft: hs(20),
          paddingRight: hs(20),
        }}
        className=" flex-row justify-between items-center bg-white rounded-tr-[30px] rounded-tl-[30px]"
      >
        <View>
          <Text style={{ fontSize: ms(20) }} className=" text-[#0F0F0F]">
            Previous {title}
          </Text>
          <Text style={{ fontSize: ms(15) }} className="text-[#708090]">
            Today, May 4
          </Text>
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
            <Text style={{ fontSize: ms(15) }} className="text-[#589E23] ">
              View All
            </Text>
          </Pressable>
        </View>
      </View>
      <Bottom data={data} isLoading={isLoading} />
    </View>
  );
};

export default Page;
