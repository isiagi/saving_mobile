import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Line, CartesianChart, useChartPressState } from "victory-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFont, Circle } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

// const CartesianChart = ({
//   data = DATA,
//   xKey = "day",
//   yKeys = ["highTmp"],
//   axisOptions = {},
//   children,
// }) => {
//   return (
//     <OriginalCartesianChart
//       data={data}
//       xKey={xKey}
//       yKeys={yKeys}
//       axisOptions={axisOptions}
//     >
//       {children}
//     </OriginalCartesianChart>
//   );
// };

const INIT_STATE = { x: 0, y: { highTmp: 0 } };

const Chart = ({ chartData }) => {
  const font = useFont(Inter_400Regular, 12);

  console.log("====================================");
  console.log(chartData);
  console.log("====================================");

  // Assuming `chartData` is an array containing your data
  const data = chartData.map((item) => ({
    week: item.week,
    count: item.count,
  }));

  const { state, isActive } = useChartPressState({
    x: { week: 0 },
    y: { count: 0 },
  });

  // Custom tick format function for y-axis
  // Custom tick format function for y-axis
  const yTickFormat = (tick) => {
    if (tick >= 1000) {
      return `${tick / 1000}K`;
    }
    return tick;
  };

  console.log(state, "state");

  return (
    <View style={{ height: 280 }}>
      {/* <Text>Chart</Text> */}
      <CartesianChart
        data={data}
        xKey={"week"}
        yKeys={["count"]}
        axisOptions={{ font }}
        chartPressState={state}
        // padding={10}
        // domain={{ x: [1, 4] }}
        // formatYLabel={yTickFormat}
      >
        {({ points }) => (
          <>
            <Line
              points={points.count}
              color={"#589E23"}
              strokeWidth={2}
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive && state?.x?.position && state?.y?.count?.position && (
              <ToolTip
                x={state.x.position.value}
                y={state.y.count.position.value}
              />
            )}
          </>
        )}
      </CartesianChart>
      <View className="pt-2">
        <>
          <Text className="text-lg text-[#0F0F0F]">
            Amount :{" "}
            {isActive && state?.y?.count?.position && state.y.count.value.value}
          </Text>
          {/* <Text className="text-lg text-[#0F0F0F]">
            Week :{" "}
            {isActive &&
              state?.x?.week?.position &&
              state.x.week.position.value}
          </Text> */}
        </>
      </View>
    </View>
  );
};

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color="#0F0F0F" />;
}

// const Chart = () => {
//   const [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_700Bold,
//   });

//   const font = useFont(Inter_400Regular, 12);

//   // if (!fontsLoaded || !font) {
//   //   return null; // or a loading spinner
//   // }

//   return (
//     <View style={{ height: 250 }}>
//       <CartesianChart axisOptions={{ font }}>
//         {({ points }) => (
//           <Line points={points.highTmp} color={"pink"} strokeWidth={2} />
//         )}
//       </CartesianChart>
//     </View>
//   );
// };

export default Chart;
