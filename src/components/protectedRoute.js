import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const nevigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // write a logic to get detail of current user
    } else {
      nevigate("/login");
    }
  });

  return <div>{children}</div>;
}
