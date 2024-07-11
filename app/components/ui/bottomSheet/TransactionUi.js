import { StatusBar, Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Bottom from "../../../components/ui/bottomSheet/BottomSheet";
import TransactionSheet from "../../../components/ui/bottomSheet/TransactionSheet";
import useFetch from "../../../hooks/useFetch";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../Metrics";

const TransactionUi = ({ path }) => {
  const [data, isLoading] = useFetch(path);

  return (
    <View className="flex-1">
      <StatusBar barStyle={"dark-content"} />

      <View className="flex-1">
        <Text
          style={{
            fontSize: ms(16),
            paddingTop: vs(20),
            marginLeft: hs(20),
            marginRight: hs(20),
            marginBottom: vs(20),
          }}
          className=" text-[#708090] font-semibold"
        >
          Most Recent Transaction
        </Text>
        <TransactionSheet data={data} isLoading={isLoading} />
      </View>
    </View>
  );
};

export default TransactionUi;
