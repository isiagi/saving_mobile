import { useEffect, useState } from "react";
import BASEAPI from "../utils/api/authBase";

function useFetch(path) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await BASEAPI.get(path);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return [data, isLoading];
}

export default useFetch;
