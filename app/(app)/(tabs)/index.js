import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, useRouter } from "expo-router";

import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeModal from "../../components/ui/homeModal/HomeModal";
import Chart from "../../components/ui/chart/Chart";
import { AuthContext } from "../../store/ctx";
import useGetById from "../../hooks/useGetById";
import { DataContext } from "../../store/dataCtx";
import useFetchMultiple from "../../hooks/useFetchHome";
import Spinner from "react-native-loading-spinner-overlay";
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from "../../components/ui/Metrics";
import { Button, styled } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
});

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

  const router = useRouter();

  // const [data, isLoading] = useGetById("user_profile/profile", authId);
  const url = [
    { url: `user_profile/profile/${authId}` },
    { url: "saving" },
    { url: "saving/data/" },
  ];

  // todo: make { url: "saving/data/2024/7" }, match previous month data

  // raiseData(data);
  // setLoading(isLoading);

  const [dataz, isLoading, error] = useFetchMultiple(url);

  // Use useEffect to handle side effects
  useEffect(() => {
    setLoading(isLoading);
    // AsyncStorage.removeItem("authToken");
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (dataz.length > 0) {
      raiseData(dataz[0]);
    }
  }, [dataz, raiseData]);

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  // console.log(dataz[dataz.length - 1], "chart data");

  const chartData = dataz[dataz.length - 1];

  console.log(chartData, "chart data");

  const data = dataz[0];
  // raiseData(data);

  // saving total
  const savingTotal = dataz[0] && dataz[1];
  //reduce the amount key
  const savings =
    savingTotal &&
    savingTotal.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  console.log(savings, "savings");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
  });

  const image_url = data[0] && data[0].image_url;
  return (
    <ScrollView className="flex-1">
      {/* heading */}
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <View>
          <Pressable>
            <View
              style={{
                paddingTop: vs(10),
                paddingBottom: vs(20),
                paddingLeft: hs(20),
                paddingRight: hs(20),
              }}
              className="flex-row justify-between items-center gap-2"
            >
              <View>
                <View className="flex-row items-center justify-center gap-1">
                  <Text style={{ fontSize: ms(25) }} className="text-slate-700">
                    Hello
                  </Text>
                  <Text
                    style={{ fontSize: ms(25) }}
                    className=" font-bold  text-[#589E23]"
                  >
                    {data[0] && data[0].user.last_name}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: ms(15), marginTop: vs(5) }}
                  className="text-[#708090]"
                >
                  Have a nice day!
                </Text>
              </View>

              <Image
                style={{
                  width: hs(50),
                  height: vs(50),
                  borderRadius: ms(25),
                }}
                source={{
                  uri: image_url || "https://reactnative.dev/img/tiny_logo.png",
                }}
                alt="image"
              />
            </View>
          </Pressable>
          <View
            style={{
              paddingTop: vs(25),
              paddingBottom: vs(25),
              paddingLeft: hs(20),
              paddingRight: hs(20),
              marginLeft: hs(20),
              marginRight: hs(20),
            }}
            className=" bg-[#fff]  gap-7 rounded-xl flex-row justify-between items-center"
          >
            <View>
              <Text style={{ fontSize: ms(15) }} className=" text-[#708090]">
                Current Saving Balance
              </Text>
              <Text
                style={{ fontSize: ms(25), marginTop: vs(10) }}
                className=" text-[#589E23] font-bold "
              >
                {formatter.format(savings)}
              </Text>
            </View>
            <View>
              <FontAwesome size={40} name="money" color={"#fde047"} />
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* chart */}
      <View className="mx-5 my-7 ">
        <View className="flex-row justify-between items-center mb-2">
          <Text
            style={{ paddingBottom: vs(10), fontSize: ms(20) }}
            className=" font-medium text-slate-700"
          >
            Last Month Saving
          </Text>
          <Pressable onPress={() => router.push("/(app)/(tabs)/saving")}>
            <Text
              style={{ paddingBottom: vs(10), fontSize: ms(15) }}
              className=" text-yellow-400 underline"
            >
              View Savings
            </Text>
          </Pressable>
        </View>
        <Chart chartData={chartData} />
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
      <View
        style={{
          paddingTop: vs(15),
          paddingBottom: vs(40),
          marginLeft: hs(10),
          marginRight: hs(10),
        }}
        className="bg-[#fff]  gap-5 rounded-tl-3xl rounded-tr-lg rounded-br-3xl"
      >
        <View
          style={{ gap: ms(15), marginLeft: hs(20), marginRight: hs(20) }}
          className="flex-row  items-center "
        >
          <FontAwesome size={50} name="money" color={"#fde047"} />
          <View>
            <Text style={{ fontSize: ms(20) }} className=" text-slate-700">
              Get A Loan
            </Text>
            <Text
              style={{ fontSize: ms(15), marginTop: vs(5) }}
              className="text-[#708090]"
            >
              {/* date today */}
              Today, {new Date().toLocaleDateString("en-US")}
            </Text>
          </View>
        </View>
        <View
          style={{ marginLeft: hs(10), marginRight: hs(10), marginTop: vs(10) }}
        >
          <CustomButton
            size="$4"
            c
            style={{
              marginLeft: hs(10),
              marginRight: hs(10),
              marginTop: vs(10),
            }}
            olor="#fff"
            onPress={() => router.push("loan/getLoan")}
          >
            Apply For Loan
          </CustomButton>
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
    </ScrollView>
  );
}
