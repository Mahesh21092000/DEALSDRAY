import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find((u) => u.email === email && u.password === password);

    if (
      user
    ) {
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials or user not signed up");
    }
  };

  const RedirectToSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="login-template">
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1>Login Form</h1>
          <label> Enter Mail</label>
          <input
            type="text"
            placeholder="Enter the User Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter the Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button type="submit">Login</button>
          <p>
            {" "}
            Don't Have an Account? {""}{" "}
            <span
              onClick={RedirectToSignup}
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              {" "}
              SignUp
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
