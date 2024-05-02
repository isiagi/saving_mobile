import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91ab97f63",
    title: "Second Item",
  },
  {
    id: "3ac68afc-c605-48d3-a9f8-fbd91ab97f63",
    title: "Second Item",
  },
];

const Item = ({ title }) => (
  <View className="bg-slate-600 p-5 mt-5 flex-row items-center gap-4 justify-between">
    <View className="flex-row items-center gap-4">
      <FontAwesome size={24} name="dollar" />
      <View>
        <Text>{title}</Text>
        <Text>23:15pm</Text>
      </View>
    </View>

    <View>
      <Text>Amount</Text>
      <Text>400,000</Text>
    </View>
  </View>
);

const Page = ({ title }) => {
  return (
    <View className="flex-1 overflow-hidden">
      <SafeAreaView />
      <View className="relative">
        <View className="bg-slate-800 p-20 items-center">
          <Text className="text-white text-3xl max-w-[200px] text-center">
            Your Agalyawam {title}
          </Text>
        </View>

        <View className="bg-red-400 w-full overflow-hidden p-7 mx-5 absolute -bottom-[calc(100%/4)]">
          <View>
            <Text>Account Balance</Text>
            <Text>300,000</Text>
          </View>
        </View>
      </View>
      {/* <Link href="/">Home</Link> */}
      <View className="mx-5 flex-1 mt-16">
        <Text className="text-2xl">Previous {title}</Text>
        <Text>Today, May 4</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.navigate("/saving")}>
              <Item title={item.title} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
