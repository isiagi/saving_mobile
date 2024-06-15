import { StatusBar, Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Bottom from "../../../components/ui/bottomSheet/BottomSheet";
import TransactionSheet from "../../../components/ui/bottomSheet/TransactionSheet";
import useFetch from "../../../hooks/useFetch";

const TransactionUi = ({ path }) => {
  const [data, isLoading] = useFetch(path);

  return (
    <View className="flex-1">
      <StatusBar barStyle={"dark-content"} />

      <View className="flex-1">
        <Text className="mx-5 text-[#708090] font-semibold pt-5">
          Most Recent Transaction
        </Text>
        <TransactionSheet data={data} isLoading={isLoading} />
      </View>
    </View>
  );
};

export default TransactionUi;
