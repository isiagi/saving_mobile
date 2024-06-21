import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";
import { useEffect, useState } from "react";

const Chart = ({ chartData }) => {
  const screenWidth = Dimensions.get("window").width;

  const [dataz, setData] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    if (!chartData || !Array.isArray(chartData)) {
      console.error("Invalid chartData format:", chartData);
      return;
    }

    const newData = [];
    const newLabels = [];

    chartData.forEach(({ count, week }) => {
      if (typeof count === "number") {
        newData.push(count);
      } else {
        console.warn("Invalid count value:", count);
      }

      if (typeof week === "string" || typeof week === "number") {
        newLabels.push(week);
      } else {
        console.warn("Invalid week value:", week);
      }
    });

    setData(newData.reverse());
    setLabel(newLabels.reverse());

    // Debugging logs
    console.log("Processed data:", newData);
    console.log("Processed labels:", newLabels);
  }, [chartData]);

  const data = {
    labels: label,
    datasets: [
      {
        data: dataz,
        color: (opacity = 1) => `#589E23`,
        strokeWidth: 2,
      },
    ],
    legend: ["Savings in 000 / week"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#0F0F0F`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  if (dataz.length === 0 || label.length === 0) {
    return (
      <View>
        <Text>No data available to display the chart.</Text>
      </View>
    );
  }

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      formatYLabel={(value) => Math.round(value / 1000).toString()}
    />
  );
};

export default Chart;
