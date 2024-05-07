import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Bottom from "../../../components/ui/bottomSheet/BottomSheet";

export class Page extends Component {
  render() {
    return (
      <View className="flex-1 bg-slate-800">
        <SafeAreaView />

        <Bottom />
      </View>
    );
  }
}

export default Page;
