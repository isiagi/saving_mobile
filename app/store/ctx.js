import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import API from "../utils/api/authBase";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  isLoading: true,
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const id = await AsyncStorage.getItem("authId");
      // console.log("Fetched token from AsyncStorage:", token);
      if (token) {
        setAuthToken(token);
        setAuthId(id);
        setIsAuthenticated(true);
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    fetchToken();
  }, []);

  async function authenticate(token, id) {
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("authId", `${id}`);

    setAuthToken(token);
    setAuthId(id);
    setIsAuthenticated(true);
  }

  async function logout() {
    try {
      // setIsLoading(true);
      Alert.alert(
        "Log Out Account",
        "Are sure you want to Log out",
        [
          {
            text: "Log Out",
            onPress: async () => {
              setIsLoading(true);
              await API.post("auth/logout");
              await AsyncStorage.removeItem("authToken");
              await AsyncStorage.removeItem("authId");
              setIsAuthenticated(false);
              setAuthToken(null);
              setIsLoading(false);
            },
            style: "default",
          },
          {
            text: "Cancel",
            onPress: () => Alert.alert("Logout Cancelled"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => Alert.alert("Log Out Cancelled"),
        }
      );
      // await API.post("auth/logout");
      // await AsyncStorage.removeItem("authToken");
      // await AsyncStorage.removeItem("authId");
      // setIsAuthenticated(false);
      // setAuthToken(null);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      await AsyncStorage.removeItem("authToken");
      setAuthToken(null);
    }
  }

  const value = {
    token: authToken,
    isAuthenticated,
    authenticate,
    logout,
    authId,
    isLoading,
  };

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading App..."}
        textStyle={{ color: "#FFF" }}
      />
    ); // or a loading spinner/indicator
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
