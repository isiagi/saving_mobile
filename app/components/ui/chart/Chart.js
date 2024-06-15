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

const Chart = () => {
  const font = useFont(Inter_400Regular, 12);

  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

  return (
    <View style={{ height: 280 }}>
      {/* <Text>Chart</Text> */}
      <CartesianChart
        data={DATA}
        xKey={"day"}
        yKeys={["highTmp"]}
        axisOptions={{ font }}
        chartPressState={state}
      >
        {({ points }) => (
          <>
            <Line
              points={points.highTmp}
              color={"#589E23"}
              strokeWidth={2}
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive && (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            )}
          </>
        )}
      </CartesianChart>
      <View className="pt-2">
        <Text className="text-lg text-[#0F0F0F]">
          Amount : {state.y.highTmp.position.value}
        </Text>
        <Text className="text-lg text-[#0F0F0F]">
          Tmp : {state.x.position.value}
        </Text>
      </View>
    </View>
  );
};

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
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
