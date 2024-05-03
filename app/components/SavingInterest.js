import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import React from "react";

const SavingInterest = () => {
  return (
    <View className="flex-row items-center gap-4 justify-between mx-5 bg-slate-700 p-5">
      <View>
        <Text>Saved With Interest</Text>
        <Text>300,000</Text>
      </View>
      <View>
        <CircularProgress
          value={12}
          radius={40}
          duration={2000}
          progressValueColor={"#2D77ED"}
          maxValue={100}
          title={"%"}
          titleColor={"#2DED67"}
          titleStyle={{ fontWeight: "bold" }}
        />
      </View>
    </View>
  );
};

export default SavingInterest;
