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
                <TouchableOpacity onPress={handlePresentModalPress}>
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
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Bottom;
