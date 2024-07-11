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
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../Metrics";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91ab97f63",
//     title: "Second Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a9f8-fbd91ab97f63",
//     title: "Second Item",
//   },
// ];

const Item = ({ data }) => (
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
    {/* filter out null values, user_id, id, account_number, created_at, updated_at, plan, user, granteers, type */}

    {Object.keys(data)
      .filter(
        (key) =>
          key !== "user_id" &&
          key !== "id" &&
          key !== "account_number" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "type" &&
          key !== "user" &&
          key !== "granteers" &&
          key !== "plan" &&
          key !== "saving_id"
      )
      .map((key) => {
        const value = data[key];
        const isObject = typeof value === "object" && value !== null;

        return (
          <View key={key}>
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

const TransactionSheet = ({ data, isLoading }) => {
  const [modalData, setModalData] = useState({});

  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => [200, 400], []);

  // callbacks
  const handlePresentModalPress = useCallback((item) => {
    // useModalStore.getState().openModal(); // Call the openModal function from the store
    bottomSheetModalRef.current.present();
    setModalData(item);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
        <Text>Loading...</Text>
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
          <View className="">
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
                        style={{ paddingTop: vs(20) }}
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
                {/* <View>
                  {modalData &&
                    Object.keys(modalData).map(
                      (key) =>
                        key !== "user_id" &&
                        key !== "created_at" &&
                        key !== "updated_at" &&
                        key !== "id" &&
                        key !== "account_number" &&
                        key !== "user" && (
                          <View
                            key={key}
                            className="flex-row justify-between items-center w-full px-5 py-2"
                          >
                            <Text className="text-xl text-black">
                              {key.replace(/_/g, " ")}
                            </Text>
                            <Text className="text-black">{modalData[key]}</Text>
                          </View>
                        )
                    )}
                </View> */}
                {/* <Text>Awesome 🎉</Text> */}
              </ScrollView>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: hs(10),
    marginRight: hs(10),
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    backgroundColor: "#589E23",
    shadowColor: "#eee",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default TransactionSheet;
