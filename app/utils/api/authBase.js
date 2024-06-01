import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./base";

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  console.log("tokenz", token);
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

const BASEAPI = API;

export default BASEAPI;
