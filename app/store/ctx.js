import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import API from "../utils/api/authBase";
import { Text } from "react-native";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Fetched token from AsyncStorage:", token);
      if (token) {
        setAuthToken(token);
      }
      setIsLoading(false);
    };

    fetchToken();
  }, []);

  function authenticate(token) {
    AsyncStorage.setItem("authToken", token);
    setAuthToken(token);
  }

  async function logout() {
    try {
      await API.post("auth/logout");
      AsyncStorage.removeItem("authToken");
      setAuthToken(null);
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // or a loading spinner/indicator
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
