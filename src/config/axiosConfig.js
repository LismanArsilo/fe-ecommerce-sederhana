import axios from "axios";
import config from "./config";

export const axiosAuth = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
    "API-KEY":
      "AGVBEU1YWT432Bw2NB2eW2SD1JKHHB388JDGHYKKLDFIOHJAJJ109MNMHUJMKLDGFBVSJWE6572nHEWQQQQQEDDXS",
  },
});

axiosAuth.interceptors.response.use(
  (response) => {
    // Jika respons berhasil, kembalikan respons
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
    throw error;
  }
);

// Buat interceptor untuk merespons perubahan token
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosWithOutAuth = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWithKey = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
    "API-KEY":
      "AGVBEU1YWT432Bw2NB2eW2SD1JKHHB388JDGHYKKLDFIOHJAJJ109MNMHUJMKLDGFBVSJWE6572nHEWQQQQQEDDXS",
  },
});
