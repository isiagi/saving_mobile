import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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

const Item = ({ title }) => (
  <View
    style={styles.shadow}
    className="p-5 mt-5 flex-row items-center gap-4 justify-between"
  >
    <View className="flex-row items-center gap-4">
      <View className="bg-[#2E3E52] w-10 h-10 rounded-full justify-center items-center">
        <FontAwesome size={24} name="dollar" color={"#D18A0D"} />
      </View>
      <View>
        <Text className="text-xl text-[#0D68D1]">{title}</Text>
        <Text className="text-[#2E3E52]">23:15pm</Text>
      </View>
    </View>

    <View>
      <Text className="text-xl text-[#0D68D1]">Amount</Text>
      <Text className="text-[#2E3E52]">400,000</Text>
    </View>
  </View>
);

const Bottom = () => {
  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => [200, 400], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // useModalStore.getState().openModal(); // Call the openModal function from the store
    bottomSheetModalRef.current.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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
              data={DATA}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className=""
                  onPress={handlePresentModalPress}
                >
                  <Item title={item.title} />
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
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Bottom;
