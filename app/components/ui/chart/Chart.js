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

    chartData.forEach(({ total_amount, month }) => {
      if (
        typeof total_amount === "string" ||
        typeof total_amount === "number"
      ) {
        newData.push(total_amount);
      } else {
        console.warn("Invalid count value:", total_amount);
      }

      if (typeof month === "string" || typeof month === "number") {
        newLabels.push(month);
      } else {
        console.warn("Invalid month value:", month);
      }
    });

    setData(newData);
    setLabel(newLabels);

    // Debugging logs
    // console.log("Processed data:", newData);
    // console.log("Processed labels:", newLabels);
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
    legend: ["Savings in 000 / month"],
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
      height={230}
      chartConfig={chartConfig}
      formatYLabel={(value) => Math.round(value / 1000).toString()}
    />
  );
};

export default Chart;
