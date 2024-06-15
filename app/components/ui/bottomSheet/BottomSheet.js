import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const Item = ({ data }) => (
  <View
    style={styles.shadow}
    className="p-5 mt-3 flex-row items-center gap-4 justify-between rounded-xl"
  >
    <View className="flex-row items-center gap-4">
      <View className="bg-[#fff] w-10 h-10 rounded-full justify-center items-center">
        <FontAwesome size={24} name="money" color={"#589E23"} />
      </View>
      <View>
        <Text className="text-2xl text-[#fff]">{data.member_name}</Text>
        <Text className="text-[#fff] text-lg pt-1">{data.date_of_payment}</Text>
      </View>
    </View>

    <View>
      <Text className="text-xl text-[#fff]">Amount</Text>
      <Text className="text-[#fff] text-xl pt-1">{data.amount}</Text>
    </View>
  </View>
);

const Bottom = ({ data, isLoading }) => {
  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => [200, 400], []);
  const [modalData, setModalData] = useState({});

  // callbacks
  const handlePresentModalPress = useCallback((item) => {
    // useModalStore.getState().openModal(); // Call the openModal function from the store
    console.log("====================================");
    console.log(item);
    console.log("====================================");
    bottomSheetModalRef.current.present();
    setModalData(item);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size={"large"} />
      </View>
    );

  if (!data)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>No data</Text>
      </View>
    );

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View>
          {/* <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          /> */}
          <View className="mx-5">
            <FlatList
              data={data && data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className=""
                  onPress={() => handlePresentModalPress(item)}
                >
                  <Item data={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View className="flex-row justify-between pt-4">
                <Text className="text-lg text-[#0F0F0F]">Membership ID : </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.member_id}
                </Text>
              </View>

              <View className="flex-row justify-between py-4">
                <Text className="text-lg text-[#0F0F0F]">Member Name: </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.member_name}
                </Text>
              </View>

              <View className="flex-row justify-between pb-4">
                <Text className="text-lg text-[#0F0F0F]">Amount : </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.amount}
                </Text>
              </View>

              <View className="flex-row justify-between pb-4">
                <Text className="text-lg text-[#0F0F0F]">
                  Data of Payment :{" "}
                </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.date_of_payment}
                </Text>
              </View>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    backgroundColor: "#589E23",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Bottom;
