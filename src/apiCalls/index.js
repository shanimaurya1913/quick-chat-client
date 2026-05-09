// import axios from "axios";

// export const axiosInstance = axios.create({
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

import axios from "axios";
import { API_URL } from "../config/constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
