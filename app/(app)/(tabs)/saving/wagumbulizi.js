import React from "react";

import TransactionUi from "../../../components/ui/bottomSheet/TransactionUi";
import useFetch from "../../../hooks/useFetch";
import PageComponent from "../../../components/Single";

const Page = () => {
  const [data, isLoading] = useFetch("wagubumbuzi");
  return (
    <PageComponent title={"Wagubumbuzi"} data={data} isLoading={isLoading} />
  );
};

export default Page;
