import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/ctx";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import membership from "../../utils/api_routes/auth/member";
import axios from "axios";
import ButtonUi from "../../components/ui/custom/Button";
import { Form, Spinner, YStack, Input, Button, styled } from "tamagui";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../../components/ui/Metrics";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const MembershipForm = () => {
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const authCtx = useContext(AuthContext);

  const onChangeText = (text) => {
    setText(text);
  };

  const handleMember = async () => {
    try {
      setIsLoading(true);
      const response = await membership({ membership_id: text });

      router.push({
        pathname: "/(app)/otp",
        params: { membership_id: response.data.User.membership_id },
      });

      // setText("");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // The error is an Axios error
        console.error("Axios error:", error);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Error config:", error.config);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);

          // Show an alert
          Alert.alert(
            "Request Failed",
            `Status Code: ${error.response.status}\nMessage: ${error.response.data.Error}`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request data:", error.request);

          // Show an alert for request error
          Alert.alert(
            "Network Error",
            "The request was made but no response was received."
          );
        }
      } else {
        // The error is not an Axios error
        console.error("Error:", error);

        // Show a generic alert for other errors
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 px-5 bg-white">
      <SafeAreaView />
      <View>
        <Text style={{ fontSize: ms(20) }}>To Get</Text>
        <Text
          style={{ fontSize: ms(30), paddingTop: vs(5) }}
          className="text-5xl font-semibold"
        >
          Started
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <Text
          style={{ fontSize: ms(22), paddingBottom: vs(15) }}
          className="text-center  font-semibold text-[#0D68D1]"
        >
          Membership ID
        </Text>

        {/* <View className="mt-8">
        <TextInput
          className="border-[1px] py-4 px-2 mb-7"
          style={""}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Membership ID"
        />
      </View> */}
        <Form onSubmit={handleMember}>
          <YStack
            width={"100%"}
            minHeight={100}
            overflow="hidden"
            space="$2"
            padding="$2"
            marginTop="$2"
            gap="$2"
            backgroundColor="#fff"
          >
            <Input
              backgroundColor="#fff"
              padding="$4"
              size={"$6"}
              onChangeText={onChangeText}
              value={text}
              placeholder={"Enter Membership ID"}
              color="#589E23"
            />
          </YStack>

          <Form.Trigger asChild disabled={text === "" || isLoading === true}>
            <CustomButton
              icon={isLoading ? () => <Spinner /> : undefined}
              size="$5"
            >
              Submit Membership Id
            </CustomButton>
            {/* <ButtonUi title="Submit Membership Id" isLoading={isLoading} /> */}
          </Form.Trigger>
        </Form>
      </View>
      {/* <TouchableOpacity
        className="bg-[#D18A0D]"
        // onPress={() => router.navigate("/(app)/set-password")}
        onPress={handleMember}
      >
        <Text className="text-center text-white py-4 text-xl">
          Submit Membership Id
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MembershipForm;
