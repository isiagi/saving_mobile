import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePathname } from "expo-router";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../Metrics";

const Item = ({ data }) => {
  console.log(data, "data");
  return (
    <View
      style={[
        styles.shadow,
        {
          // marginTop: vs(15),
          paddingTop: vs(15),
          paddingBottom: vs(15),
          paddingLeft: hs(10),
          paddingRight: hs(10),
          marginBottom: vs(15),
        },
      ]}
      className=" flex-row items-center gap-2 justify-between flex-wrap rounded-tl-3xl rounded-tr-lg rounded-br-3xl"
    >
      {/* filter out null values, user_id, id, account_number, created_at, updated_at, type, plan, user, granteers */}

      {Object.keys(data)
        .filter(
          (key) =>
            key !== "user_id" &&
            key !== "id" &&
            key !== "account_number" &&
            key !== "created_at" &&
            key !== "updated_at" &&
            key !== "type" &&
            key !== "plan" &&
            key !== "user" &&
            key !== "granteers" &&
            key !== "saving_id"
        )
        .map((key) => {
          const value = data[key];
          const isObject = typeof value === "object" && value !== null;

          return (
            <View key={key} style={{ paddingLeft: hs(5), paddingRight: hs(5) }}>
              <Text style={{ fontSize: ms(15) }} className="text-[#fff]">
                {key.replace(/_/g, " ")}
              </Text>
              <Text className="text-[#d3d3d3]">
                {isObject && value.first_name && value.last_name
                  ? `${value.first_name} ${value.last_name}`
                  : value}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const Bottom = ({ data, isLoading }) => {
  // ref
  const bottomSheetModalRef = useRef();

  const tabPath = usePathname();

  console.log(tabPath, "tabPath");

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
          <View style={{ marginLeft: hs(10), marginRight: hs(10) }}>
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
              <ScrollView className="flex-1">
                {Object.keys(modalData)
                  .filter((key) => key !== "user_id" && key !== "id")
                  .map((key) => {
                    const value = modalData[key];
                    const isObject =
                      typeof value === "object" && value !== null;

                    return (
                      <View
                        key={key}
                        className="flex-row flex-1 gap-1 justify-between"
                        style={{ paddingTop: vs(15) }}
                      >
                        <Text
                          style={{ fontSize: ms(15) }}
                          className="text-[#000]"
                        >
                          {key.replace(/_/g, " ")}:
                        </Text>
                        <Text className="text-[#d3d3d3]">
                          {isObject && value.first_name && value.last_name
                            ? `${value.first_name} ${value.last_name}`
                            : value}
                        </Text>
                      </View>
                    );
                  })}
              </ScrollView>

              {/* <View className="flex-row justify-between pt-4">
                <Text className="text-lg text-[#0F0F0F]">Membership ID : </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && tabPath === "/loan" ? modalData.member_id : ""}
                </Text>
              </View> */}

              {/* <View className="flex-row justify-between py-4">
                <Text className="text-lg text-[#0F0F0F]">Member Name: </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && tabPath === "/loan"
                    ? modalData.member_name
                    : ""}
                </Text>
              </View> */}

              {/* <View className="flex-row justify-between pb-4">
                <Text className="text-lg text-[#0F0F0F]">Amount : </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.amount}
                </Text>
              </View> */}

              {/* <View className="flex-row justify-between pb-4">
                <Text className="text-lg text-[#0F0F0F]">
                  Data of Payment :{" "}
                </Text>
                <Text className="text-lg text-[#708090]">
                  {modalData && modalData.date_of_payment}
                </Text>
              </View> */}
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
