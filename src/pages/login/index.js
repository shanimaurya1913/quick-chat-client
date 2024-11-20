import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../apiCalls/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let resp = null;
    try {
      dispatch(showLoader());
      resp = await loginUser(user);
      dispatch(hideLoader());
      if (resp.success) {
        localStorage.setItem("token", resp.token);
        window.location.href = "/";
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(resp.message);
    }
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form" onSubmit={onFormSubmit}>
          <form>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">Signup Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
