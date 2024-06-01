import React from "react";
import PageComponent from "../../../components/Single";
import useFetch from "../../../hooks/useFetch";

const Page = () => {
  const [data, isLoading] = useFetch("loan");
  return <PageComponent title={"Loans"} data={data} isLoading={isLoading} />;
};

export default Page;
