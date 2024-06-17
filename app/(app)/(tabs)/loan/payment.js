import { View, Text } from "react-native";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import PageComponent from "../../../components/Single";
import TransactionUi from "../../../components/ui/bottomSheet/TransactionUi";

const Page = () => {
  return <TransactionUi path="payment" />;
};

export default Page;
