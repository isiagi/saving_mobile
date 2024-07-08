import OtpTextInput from "react-native-text-input-otp";
import { View, Text, Pressable } from "react-native";
import React from "react";
import API from "../../utils/api/base";
import { router } from "expo-router";
import { Button, Form, Spinner, styled } from "tamagui";
import { verticalScale } from "../../components/ui/Metrics";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const OtpScreen = ({ membership_id }) => {
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  console.log(otp);
  const handlePress = async () => {
    try {
      setLoading(true);
      const res = await API.post("auth/validate_otp/", { membership_id, otp });
      console.log(res);
      router.replace({
        pathname: "/(app)/set-password",
        params: { membership_id },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-5">
      <OtpTextInput otp={otp} setOtp={setOtp} digits={5} />
      {/* <Pressable onPress={handlePress}>
        <Text className="bg-blue-500 mt-10 p-4 text-white">Submit</Text>
      </Pressable> */}
      <View style={{ marginTop: verticalScale(25) }}>
        <Form onSubmit={handlePress}>
          <Form.Trigger asChild disabled={otp.length < 5 || loading}>
            <CustomButton
              icon={loading ? () => <Spinner /> : undefined}
              size="$5"
            >
              Submit
            </CustomButton>
          </Form.Trigger>
        </Form>
      </View>
    </View>
  );
};

export default OtpScreen;
