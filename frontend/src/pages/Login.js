import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import { UserContext } from "../App";
import swal from "sweetalert";
function Login() {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8080/login",
          { username, password },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "fillfields") {
            swal("fill required fields");
            dispatch({ type: "USER", payload: false });
            history("/login");
          }

          // if (res.data === "Usernameorpasswordincorrect")
          else if (res.status === 200 && res.data != "doesntexist") {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch({ type: "USER", payload: true });
            swal("Login Successful ✅");
            // alert("Login Successful ✅ ");
            history("/");
          } else if (res.data === "doesntexist") {
            swal("User have not Signup");
            history("/register");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <center>
      <div className="login-container">
        <h1>Login</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br></br>
          <Button size="sm" className="joinus" type="submit">
            Login
          </Button>
        </form>

        <br></br>
        <p> OR</p>

        <Button size="sm" className="joinus">
          <Link to="/register">Create Account </Link>
        </Button>
      </div>
    </center>
  );
}

export default Login;
