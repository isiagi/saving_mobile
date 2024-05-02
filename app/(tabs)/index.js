import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function Page() {
  return (
    <View className="flex-1">
      <SafeAreaView>
        <View>
          <View className="flex-row items-center p-4 gap-2">
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />

            <View className="flex-col">
              <Text>Welcome Back!</Text>
              <Text className="text-lg font-bold">Geofrey Isiagi</Text>
            </View>
          </View>
          <View className=" mx-5 bg-black p-7 gap-7">
            <Text className=" text-white">Current Saving Balance</Text>
            <Text className="text-3xl text-white font-bold">300000 shs</Text>
          </View>
        </View>
      </SafeAreaView>
      <View className="px-5 my-10">
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View className="p-7 mr-4 bg-slate-900">
              <View>
                <Text className="text-white text-lg">{item.title}</Text>
                <Text className="text-white text-2xl pt-3">Shs 86432345</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      <View className="mx-5 flex-1">
        <Text className="text-2xl">Previous Savings</Text>
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
}
