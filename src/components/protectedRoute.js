import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getLoggedUser } from "../apiCalls/users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { setAllChats, setAllUsers, setUser } from "../redux/userSlice";
import { getAllChats } from "../apiCalls/chat";

export default function ProtectedRoute({ children }) {
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    try {
      dispatch(showLoader());
      const resp = await getLoggedUser();
      dispatch(hideLoader());
      if (resp.success) {
        dispatch(setUser(resp.data));
      } else {
        nevigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      nevigate("/login");
    }
  };

  const getAllUsersFromDB = async () => {
    try {
      dispatch(showLoader());
      const resp = await getAllUsers();
      dispatch(hideLoader());
      if (resp.success) {
        dispatch(setAllUsers(resp.data));
      } else {
        nevigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      nevigate("/login");
    }
  };

  const getCurrentUserChats = async () => {
    try {
      dispatch(showLoader());
      const resp = await getAllChats();
      dispatch(hideLoader());
      if (resp.success) {
        dispatch(setAllChats(resp.data));
      } else {
        nevigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      nevigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // write a logic to get detail of current user
      getLoggedInUser();
      getAllUsersFromDB();
      getCurrentUserChats();
    } else {
      nevigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}
