import { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/api/base";
import BASEAPI from "../utils/api/authBase";

const useFetchMultiple = (requests) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all(
          requests.map((request) => BASEAPI.get(request.url))
        );
        setData(responses.map((response) => response.data));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, isLoading, error];
};

export default useFetchMultiple;
