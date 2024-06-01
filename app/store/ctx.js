import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import API from "../utils/api/authBase";
import { ActivityIndicator, Text, View } from "react-native";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const id = await AsyncStorage.getItem("authId");
      console.log("Fetched token from AsyncStorage:", token);
      if (token) {
        setAuthToken(token);
        setAuthId(id);
      }
      setIsLoading(false);
    };

    fetchToken();
  }, []);

  function authenticate(token, id) {
    AsyncStorage.setItem("authToken", token);
    AsyncStorage.setItem("authId", `${id}`);
    setAuthToken(token);
    setAuthId(id);
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
    authId,
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    ); // or a loading spinner/indicator
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
