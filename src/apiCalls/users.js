import { axiosInstance } from "./index";

export const getLoggedUser = async () => {
  try {
    const resp = await axiosInstance.get("/api/user/get-logged-user");
    return resp.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const resp = await axiosInstance.get("/api/user/get-all-users");
    return resp.data;
  } catch (e) {
    return e;
  }
};
