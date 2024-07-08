import axios from "axios";

const BASE_URL = "https://ada-backend-wtqs.onrender.com/api/";

const API = axios.create({ baseURL: BASE_URL });

export default API;
