import { useEffect, useState } from "react";
import BASEAPI from "../utils/api/authBase";

function useGetById(path, id) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await BASEAPI.get(`${path}/${id}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return [data, isLoading];
}

export default useGetById;
