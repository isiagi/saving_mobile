import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StatusBar,
  Button,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../store/ctx";
import useGetById from "../../hooks/useGetById";

const Page = () => {
  const [image, setImage] = useState(null);

  const { authId } = useContext(AuthContext);

  console.log("auth", authId);

  const [data, isLoading] = useGetById("user_profile/profile", authId);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    residence: "",
    image_url: "",
  });

  useEffect(() => {
    if (data && data[0]) {
      setFormState({
        firstName: data[0].user.first_name || "",
        lastName: data[0].user.last_name || "",
        email: data[0].user.email || "",
        occupation: data[0].occupation || "",
        residence: data[0].residence || "",
        image_url: data[0].image_url || "",
      });
    }
  }, [data]);

  console.log("data", data[0]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <StatusBar />
      <SafeAreaView>
        <View className="items-center py-10">
          <Text className="text-2xl font-medium">Edit Profile</Text>
        </View>
        <View className="mb-7">
          <Text aria-label="Label for Username" nativeID="first_name">
            First Name
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={""}
            value={formState.firstName}
            placeholder="First Name"
            aria-label="input"
            aria-labelledby="first_name"
          />
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={""}
            value={formState.lastName}
            placeholder="Last Name"
          />
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={""}
            value={formState.email}
            placeholder="Email"
          />
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={""}
            value={formState.occupation}
            placeholder="Occupation"
          />
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={""}
            value={formState.residence}
            placeholder="Residence"
          />
          {formState.image_url && (
            <Image
              source={{ uri: formState.image_url }}
              style={{ width: "100%", height: 100 }}
            />
          )}
          <Button title="Pick Image" onPress={pickImage} />

          <Pressable>
            <View className="flex-row justify-center mt-10 py-4 bg-[#D18A0D] rounded-xl">
              <Text className="text-center text-xl text-white">
                Update Profile
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Page;
