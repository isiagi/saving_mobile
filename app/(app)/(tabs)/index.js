import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";

import { useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeModal from "../../components/ui/homeModal/HomeModal";
import Chart from "../../components/ui/chart/Chart";
import { AuthContext } from "../../store/ctx";
import useGetById from "../../hooks/useGetById";
import { DataContext } from "../../store/dataCtx";
import useFetchMultiple from "../../hooks/useFetchHome";
import Spinner from "react-native-loading-spinner-overlay";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Loan Balance",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Wagumbumbuzi",
  },
  // {
  //   id: "3ac68afc-c605-48d3-a4f8-fbd91ab97f63",
  //   title: "Second Item",
  // },
  // {
  //   id: "3ac68afc-c605-48d3-a9f8-fbd91ab97f63",
  //   title: "Second Item",
  // },
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
  const [modalVisible, setModalVisible] = useState(false);
  const { authId } = useContext(AuthContext);
  const { raiseData, setLoading } = useContext(DataContext);

  // const [data, isLoading] = useGetById("user_profile/profile", authId);
  const url = [{ url: `user_profile/profile/${authId}` }, { url: "saving" }];

  // raiseData(data);
  // setLoading(isLoading);

  const [dataz, isLoading, error] = useFetchMultiple(url);

  setLoading(isLoading);
  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  const data = dataz[0];
  raiseData(data);

  const image_url = data[0] && data[0].image_url;
  return (
    <View className="flex-1 bg-white">
      {/* heading */}
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <View>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <View className="flex-row justify-between items-center p-4 gap-2">
              <View className="flex-col">
                <Text>Welcome Back!</Text>
                <Text className="text-2xl font-bold mt-2 text-[#374928]">
                  {data[0] && data[0].user.first_name}{" "}
                  {data[0] && data[0].user.last_name}
                </Text>
              </View>

              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: image_url || "https://reactnative.dev/img/tiny_logo.png",
                }}
              />
            </View>
          </Pressable>
          <View className=" mx-5 bg-[#365E32] p-7 gap-7 rounded-xl flex-row justify-between items-center">
            <View>
              <Text className=" text-white">Current Saving Balance</Text>
              <Text className="text-3xl text-white font-bold mt-7">
                300000 shs
              </Text>
            </View>
            <View>
              <FontAwesome size={36} name="dollar" color={"#fff"} />
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* chart */}
      <View className="mx-5 my-5 ">
        <View className="flex-row justify-between">
          <Text className="text-2xl font-medium pb-3 text-[#365E32]">
            Last Month Saving
          </Text>
          <Text className="text-lg pb-3 text-[#E7D37F] font-bold">
            View Savings
          </Text>
        </View>
        <Chart />
      </View>
      {/* <View className="px-5 my-10">
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
      </View> */}

      {/* Modal */}
      <HomeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {/* Loan */}
      <View className="bg-[#365E32] mx-5 py-5 gap-5 rounded-tl-3xl rounded-tr-lg">
        <View className="flex-row gap-7 items-center mx-7">
          <FontAwesome size={38} name="money" color={"#fff"} />
          <View>
            <Text className="text-2xl text-white">Get A Loan</Text>
            <Text className="text-white">Today, May 4</Text>
          </View>
        </View>
        <View className="mx-5">
          <TouchableOpacity className="bg-[#E7D37F] p-5 mx-2 rounded-sm">
            <Text className="text-center text-[#81A263] text-xl">
              Apply For Loan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="mx-5 flex-1">
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
      </View> */}
    </View>
  );
}
