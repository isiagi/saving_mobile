import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StatusBar,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../store/ctx";
import useGetById from "../../hooks/useGetById";
import editMultiData from "../../hooks/useEditProfile";

const Page = () => {
  const [image, setImage] = useState(null);

  const { authId } = useContext(AuthContext);

  console.log("auth", authId);

  const [data, isLoading] = useGetById("user_profile/profile", authId);

  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    occupation: "",
    residence: "",
    image_url: {},
  });

  useEffect(() => {
    if (data && data[0]) {
      setFormState({
        first_name: data[0].user.first_name || "",
        last_name: data[0].user.last_name || "",
        email: data[0].user.email || "",
        occupation: data[0].occupation || "",
        residence: data[0].residence || "",
        image_url: data[0].image_url || {},
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
  formData.append("gender", "male");
  formData.append("telephone", "0777963365");
  formData.append("image_url", {
    uri: formState.image_url.uri,
    type: formState.image_url.mimeType,
    name: formState.image_url.fileName,
  });
  const handlePress = async () => {
    try {
      await editMultiData(`user_profile/${data && data[0].id}`, formData);
      console.log("form", formData);
    } catch (error) {
      console.error(error.response?.data, error.toJSON());
    }
  };

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <StatusBar />
      <SafeAreaView>
        <View className="items-center py-10">
          <Text className="text-2xl font-medium">Edit Profile</Text>
        </View>
        <View className="mb-7">
          <Text aria-label="Label for firstName" nativeID="first_name">
            First Name
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, first_name: text }))
            }
            value={formState.first_name}
            placeholder="First Name"
            aria-label="input"
            aria-labelledby="first_name"
          />
          <Text aria-label="Label for lastName" nativeID="last_name">
            Last Name
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, last_name: text }))
            }
            value={formState.last_name}
            placeholder="Last Name"
            aria-label="input"
            aria-labelledby="last_name"
          />
          <Text aria-label="Label for email" nativeID="email">
            Email
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, email: text }))
            }
            value={formState.email}
            placeholder="Email"
            aria-label="input"
            aria-labelledby="email"
          />
          <Text aria-label="Label for occupation" nativeID="occupation">
            Occupation
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, occupation: text }))
            }
            value={formState.occupation}
            placeholder="Occupation"
            aria-label="input"
            aria-labelledby="occupation"
          />
          <Text aria-label="Label for residence" nativeID="residence">
            Residence
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, residence: text }))
            }
            value={formState.residence}
            placeholder="Residence"
            aria-label="input"
            aria-labelledby="residence"
          />
          {/* {formState.image_url && (
            <Image
              source={{ uri: formState.image_url }}
              style={{ width: "100%", height: 100 }}
            />
          )} */}
          <Button title="Pick Image" onPress={pickImage} />

          <Pressable onPress={handlePress}>
            <View className="flex-row justify-center mt-10 py-4 bg-[#D18A0D] rounded-xl">
              <Text className="text-center text-xl text-white">
                Update Profile
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Page;
