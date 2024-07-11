import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../store/ctx";
import useGetById from "../../hooks/useGetById";
import editMultiData from "../../hooks/useEditProfile";
import { DataContext } from "../../store/dataCtx";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../../components/ui/Metrics";
import {
  Form,
  Input,
  Label,
  YStack,
  Button,
  styled,
  Spinner,
  Switch,
} from "tamagui";

const formConfig = [
  { name: "first_name", label: "First Name", placeholder: "First Name" },
  { name: "last_name", label: "Last Name", placeholder: "Last Name" },
  { name: "email", label: "Email", placeholder: "Email" },
  { name: "occupation", label: "Occupation", placeholder: "Occupation" },
  { name: "residence", label: "Residence", placeholder: "Residence" },
  { name: "gender", label: "Gender", placeholder: "Gender" },
  { name: "telephone", label: "Telephone", placeholder: "Telephone" },
  { name: "nin", label: "NIN", placeholder: "NIN" },
  // { name: "image_url", label: "Image URL", placeholder: "Image URL" },
];

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const Page = () => {
  const [image, setImage] = useState(null);

  const { authId } = useContext(AuthContext);

  console.log("auth", authId);

  const [data, isLoading] = useGetById("user_profile/profile", authId);
  const { userData, isDataLoading } = useContext(DataContext);

  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    occupation: "",
    residence: "",
    gender: "",
    telephone: "",
    nin: "",
    is_staff: false,
    image_url: {},
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData && userData[0]) {
      setFormState({
        first_name: userData[0].user.first_name || "",
        last_name: userData[0].user.last_name || "",
        email: userData[0].user.email || "",
        gender: userData[0].gender || "",
        occupation: userData[0].occupation || "",
        residence: userData[0].residence || "",
        telephone: userData[0].telephone || "",
        nin: userData[0].nin || "",
        image_url: userData[0].image_url || {},
        is_staff: userData[0].user.is_staff || false,
      });
    }
  }, [userData]);

  console.log("userData", userData[0]);

  if (isDataLoading) {
    return <Text>Loading...</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
      setFormState((prevState) => ({
        ...prevState,
        image_url: result.assets[0],
      }));
    }
  };

  const formData = new FormData();

  formData.append("first_name", formState.first_name);
  formData.append("last_name", formState.last_name);
  formData.append("email", formState.email);
  formData.append("occupation", formState.occupation);
  formData.append("residence", formState.residence);
  formData.append("gender", formState.gender);
  formData.append("telephone", formState.telephone);
  formData.append("nin", formState.nin);
  formData.append("image_url", {
    uri: formState.image_url.uri,
    type: formState.image_url.mimeType,
    name: formState.image_url.fileName,
  });
  const handlePress = async () => {
    try {
      setLoading(true);
      await editMultiData(
        `user_profile/${userData[0] && userData[0].id}`,
        formData
      );

      router.push("/(app)/(tabs)/profile");
    } catch (error) {
      console.error(error.response?.data, error.toJSON());
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ScrollView className="flex-1 px-5">
      <StatusBar backgroundColor={"#fff"} />
      <SafeAreaView />
      <SafeAreaView>
        <View
          style={{ marginTop: vs(60), marginBottom: vs(10) }}
          className="flex-row justify-between items-center"
        >
          <Text
            style={{ fontSize: ms(20) }}
            className=" font-medium text-[#0F0F0F]"
          >
            Edit Profile
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => router.replace("/(app)/(tabs)/profile")}
            >
              <Text
                style={{ fontSize: ms(15) }}
                className="text-[#589E23] font-bold"
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Form onSubmit={handlePress}>
          <YStack width={"100%"} minHeight={200} overflow="hidden" gap="$2">
            <YStack>
              <YStack>
                {formConfig.map((field) => (
                  <React.Fragment key={field.name}>
                    <Label color="#0F0F0F" htmlFor={field.name}>
                      {field.label}
                    </Label>
                    <Input
                      backgroundColor="#fff"
                      padding="$1"
                      size={"$4"}
                      onChangeText={(text) => handleChange(field.name, text)}
                      value={formState[field.name]}
                      placeholder={field.placeholder}
                      color="#589E23"
                      id={field.name}
                    />
                  </React.Fragment>
                ))}
              </YStack>
              {/* <YStack>
                <Label color="#0F0F0F">Admin</Label>
                <Switch size="$4" defaultChecked={false}>
                  <Switch.Thumb animation="bouncy" />
                </Switch>
              </YStack> */}
            </YStack>
          </YStack>
          <View className="mb-7">
            {formState.image_url && (
              <Image
                source={{
                  uri:
                    `${formState.image_url.uri}` ||
                    "https://reactnative.dev/img/tiny_logo.png",
                }}
                style={{
                  width: "100%",
                  height: vs(200),
                  marginBottom: vs(12),
                  marginTop: vs(12),
                }}
              />
            )}

            <CustomButton size="$5" onPress={pickImage}>
              Pick Image
            </CustomButton>
          </View>
          <Form.Trigger asChild disabled={loading}>
            <CustomButton
              icon={loading ? () => <Spinner /> : undefined}
              size="$5"
            >
              Update Profile
            </CustomButton>
          </Form.Trigger>
        </Form>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Page;
