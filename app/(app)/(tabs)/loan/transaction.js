import { StatusBar, Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Bottom from "../../../components/ui/bottomSheet/BottomSheet";
import TransactionSheet from "../../../components/ui/bottomSheet/TransactionSheet";

export class Page extends Component {
  render() {
    return (
      <View className="flex-1 bg-[#2D5C91]">
        <StatusBar barStyle={"dark-content"} />

        <View className="flex-1">
          <Text className="mx-5 text-white font-semibold pt-5">
            Most Recent Transaction
          </Text>
          <TransactionSheet />
        </View>
      </View>
    );
  }
}

export default Page;
