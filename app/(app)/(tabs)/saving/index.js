import { View, Text } from "react-native";
import React from "react";
import PageComponent from "../../../components/Single";
import useFetch from "../../../hooks/useFetch";

const Page = () => {
  const [data, isLoading] = useFetch("saving");
  return <PageComponent title={"Savings"} data={data} isLoading={isLoading} />;
};

export default Page;
