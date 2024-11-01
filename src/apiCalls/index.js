// import axios from "axios";

// export const axiosInstance = axios.create({
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Direct server URL
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
