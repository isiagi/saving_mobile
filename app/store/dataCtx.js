import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api/authBase";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "./ctx";
import useGetById from "../hooks/useGetById";

export const DataContext = createContext({
  data: [],
});

const DataContextProvider = ({ children }) => {
  const [userData, setData] = useState([]);
  const [isDataLoading, setIsLoading] = useState(true);

  function raiseData(data) {
    setData(data);
  }

  function setLoading(id) {
    setIsLoading(id);
  }

  const value = {
    userData,
    raiseData,
    isDataLoading,
    setLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
