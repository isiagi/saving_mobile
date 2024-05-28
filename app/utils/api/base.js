import axios from "axios";

const BASE_URL = "http://10.0.2.2:8000/api/";

const API = axios.create({ baseURL: BASE_URL });

export default API;
