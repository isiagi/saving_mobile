import { ToastAndroid, ScrollView } from "react-native";
import React from "react";
import { Form, YStack, Label, Input, Button, styled, Spinner } from "tamagui";
import { send } from "@emailjs/react-native";
import {
  verticalScale as vs,
  moderateScale as ms,
  horizontalScale as hs,
} from "../../../components/ui/Metrics";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

// form config fields > membership_id, amount, duration, guarantor, nin, phone, email, occupation, residence, gender

const formConfig = [
  {
    name: "name",
    label: "FullName",
    placeholder: "Names",
  },
  {
    name: "membership_id",
    label: "Membership Id",
    placeholder: "Membership Id",
  },
  {
    name: "amount",
    label: "Amount",
    placeholder: "Amount",
  },
  {
    name: "duration",
    label: "Duration",
    placeholder: "Duration",
  },
  {
    name: "guarantor",
    label: "Guarantor",
    placeholder: "Guarantor",
  },
  {
    name: "nin",
    label: "NIN",
    placeholder: "NIN",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Phone",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "occupation",
    label: "Occupation",
    placeholder: "Occupation",
  },
  {
    name: "residence",
    label: "Residence",
    placeholder: "Residence",
  },

  {
    name: "gender",
    label: "Gender",
    placeholder: "Gender",
    type: "picker", // Add type to indicate it's a dropdown
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
  padding: 12,
});

const Page = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    membership_id: "",
    amount: "",
    duration: "",
    guarantor: "",
    nin: "",
    phone: "",
    email: "",
    occupation: "",
    residence: "",
    gender: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  //   submit

  const handelSubmit = async () => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(formState).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      ToastAndroid.show("Please fill all fields before submitting", 5000);
      return;
    }

    try {
      setLoading(true);
      await send("service_znx9z77", "template_of7jajp", formState, {
        publicKey: "QU9PW2vVvLMnJzkwn",
      });

      console.log("SUCCESS!");
      ToastAndroid.show("We have received your loan request", 7000);
      // await 5seconds before pushing to home

      setTimeout(() => {
        router.push("/(app)/(tabs)");
      }, 5000);
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EmailJS Request Failed...", err);
      }

      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ marginLeft: hs(10), marginRight: hs(10) }}
    >
      <Form onSubmit={handelSubmit}>
        <YStack width={"100%"} minHeight={200} overflow="hidden" gap="$2">
          <YStack>
            <YStack>
              {formConfig.map((field, i) => (
                <React.Fragment key={i}>
                  <Label color="#0F0F0F" htmlFor={field.name}>
                    {field.label} *
                  </Label>
                  {field.type === "picker" ? (
                    <Picker
                      selectedValue={formState.gender}
                      onValueChange={(itemValue) =>
                        handleChange(field.name, itemValue)
                      }
                      style={{
                        backgroundColor: "#fff",
                        color: "#589E23",
                        paddingVertical: 10,
                      }}
                    >
                      {field.options.map((option) => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  ) : (
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
                  )}
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

        <Form.Trigger asChild disabled={loading}>
          <CustomButton
            icon={loading ? () => <Spinner /> : undefined}
            size="$5"
            style={{ marginTop: vs(20), marginBottom: vs(20) }}
          >
            Apply Loan
          </CustomButton>
        </Form.Trigger>
      </Form>
    </ScrollView>
  );
};

export default Page;
