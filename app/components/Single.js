import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import SavingInterest from "./SavingInterest";
import Bottom from "./ui/bottomSheet/BottomSheet";
import { router, usePathname } from "expo-router";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "./ui/Metrics";

import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import BASEAPI from "../utils/api/authBase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, styled } from "tamagui";
import { Download } from "@tamagui/lucide-icons";

const CustomButton = styled(Button, {
  backgroundColor: "#facc15", // Change this to your desired color
});

const Page = ({ title, data, isLoading }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const tabPath = usePathname();
  console.log(tabPath, "tabPath");

  const toRoute =
    tabPath === "/loan/payment" || tabPath === "/saving/wagumbulizi"
      ? tabPath.split("/")[2]
      : tabPath.split("/")[1];

  useEffect(() => {
    if (data && data.length > 0) {
      // if toRoute is loan,then use curr.remaining_amount

      // if toRoute is saving,then use curr.amount
      console.log(data, "data");
      const total = data.reduce(
        (acc, curr) =>
          acc +
          parseFloat(toRoute === "loan" ? curr.remaining_amount : curr.amount),
        0
      );
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [data]);

  // currency format
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
  });

  console.log(totalAmount, "total amount");

  const downloadFromApi = async () => {
    console.log("Download started");
    const filename = `${toRoute}.pdf`;

    // Get auth token from AsyncStorage
    const token = await AsyncStorage.getItem("authToken");

    // Check if token exists
    if (!token) {
      console.error("No auth token found.");
      return;
    }

    console.log("Token retrieved:", token);

    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    setLoading(true);
    console.log("Loading state set to true");

    try {
      const result = await FileSystem.downloadAsync(
        `https://agalyawamm-backend.onrender.com/api/pdfs/${toRoute}/`,
        FileSystem.documentDirectory + filename,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Download result:", result);
      save(result.uri, filename, "application/pdf");
    } catch (error) {
      console.error("Error during download:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
    console.log("Loading state set to false");
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Permission denied");
        shareAsync(uri);
      }
    } else {
      await shareAsync(uri);
    }
  };

  return (
    <View className="flex-1 overflow-hidden">
      <StatusBar barStyle={"dark-content"} />
      <View style={{ marginBottom: vs(50) }} className=" flex">
        <View
          style={{ marginTop: vs(30), marginBottom: vs(30) }}
          className="items-center"
        >
          <Text
            style={{ fontSize: ms(25) }}
            className="text-slate-700  text-center"
          >
            Your {title}
          </Text>
        </View>

        <View
          style={{ paddingTop: vs(20), paddingBottom: vs(20) }}
          className="bg-[#589E23] self-center overflow-hidden w-[65%] mx-auto my-0 rounded-tl-3xl rounded-tr-lg rounded-br-3xl"
        >
          <View className="flex-row justify-center items-center ">
            <View>
              <Text
                style={{ fontSize: ms(15) }}
                className="text-white text-center"
              >
                {title !== "Loans" ? `${title} Total` : `${title} Balance`}
              </Text>
              <Text
                style={{ fontSize: ms(25), marginTop: vs(5) }}
                className="text-white"
              >
                {/* currency */}
                {formatter.format(totalAmount)}
              </Text>
            </View>
            {/* <View className="">
              {toRoute === "loan" && (
                <Button className="h-fit" title="Get Loan">
                  Get Loan
                </Button>
              )}
            </View> */}
          </View>
        </View>
      </View>
      {/* <Button title="Download From API" onPress={downloadFromApi} /> */}
      {/* <SavingInterest /> */}

      {/* <Link href="/">Home</Link> */}
      <View
        style={{
          paddingBottom: vs(20),
          paddingTop: vs(20),
          paddingLeft: hs(20),
          paddingRight: hs(20),
        }}
        className=" flex-row justify-between items-center bg-white rounded-tr-[30px] rounded-tl-[30px]"
      >
        <View>
          <Text style={{ fontSize: ms(20) }} className=" text-slate-700">
            Previous {title}
          </Text>
          <Text
            style={{ fontSize: ms(15), paddingTop: vs(5) }}
            className="text-[#708090]"
          >
            Today, {new Date().toLocaleDateString("en-US")}
          </Text>
        </View>
        <View>
          {/* <Pressable
            onPress={() =>
              router.navigate(
                `/(tabs)/${
                  tabPath === "/loan/payment" ? "loan" : toRoute
                }/transaction`
              )
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "white",
              },
              { padding: 6, borderRadius: 4 },
            ]}
          >
            <Text
              style={{ fontSize: ms(15) }}
              className="text-yellow-400 underline "
            >
              View All
            </Text>
          </Pressable> */}
          <CustomButton
            iconAfter={Download}
            size="$4"
            onPress={downloadFromApi}
            color={`${loading ? "gray" : "#589E23"}`}
          >
            {`${
              !loading
                ? `${toRoute.charAt(0).toUpperCase() + toRoute.slice(1)} Pdf`
                : "Loading..."
            }`}
          </CustomButton>
        </View>
      </View>
      <Bottom data={data} isLoading={isLoading} />
    </View>
  );
};

export default Page;
