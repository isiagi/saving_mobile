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
    image_url: {},
  });

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
        image_url: userData[0].image_url || {},
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
  formData.append("image_url", {
    uri: formState.image_url.uri,
    type: formState.image_url.mimeType,
    name: formState.image_url.fileName,
  });
  const handlePress = async () => {
    try {
      await editMultiData(
        `user_profile/${userData[0] && userData[0].id}`,
        formData
      );
      console.log("form", formData);
    } catch (error) {
      console.error(error.response?.data, error.toJSON());
    }
  };

  return (
    <ScrollView className="flex-1 px-5 bg-white">
      <StatusBar />
      <SafeAreaView />
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-16 mb-4">
          <Text className="text-2xl font-medium">Edit Profile</Text>

          <View>
            <TouchableOpacity
              onPress={() => router.replace("/(app)/(tabs)/profile")}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-7">
          <Text aria-label="Label for firstName" nativeID="first_name">
            First Name
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({
                ...prevState,
                first_name: text,
              }))
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
          <Text aria-label="Label for gender" nativeID="gender">
            Gender
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, gender: text }))
            }
            value={formState.gender}
            placeholder="Gender"
            aria-label="input"
            aria-labelledby="gender"
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
              setFormState((prevState) => ({
                ...prevState,
                occupation: text,
              }))
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
          <Text aria-label="Label for telephone" nativeID="telephone">
            Telephone
          </Text>
          <TextInput
            className="border-[1px] py-4 px-2 text-xl mb-5"
            onChangeText={(text) =>
              setFormState((prevState) => ({ ...prevState, telephone: text }))
            }
            value={formState.telephone}
            placeholder="Telephone"
            aria-label="input"
            aria-labelledby="telephone"
          />
          {formState.image_url && (
            <Image
              source={{
                uri:
                  `${formState.image_url}` ||
                  "https://reactnative.dev/img/tiny_logo.png",
              }}
              style={{ width: "100%", height: 150, marginBottom: 10 }}
            />
          )}
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
