import React, { useCallback } from "react";
import PageComponent from "../../../components/Single";
import useFetch from "../../../hooks/useFetch";
import { router, useFocusEffect, useRouter } from "expo-router";

const Page = () => {
  const [data, isLoading] = useFetch("loan");
  return <PageComponent title={"Loans"} data={data} isLoading={isLoading} />;
};

export default Page;
