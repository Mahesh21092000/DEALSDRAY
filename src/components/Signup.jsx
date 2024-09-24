import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate('');



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      alert("Please fill all the details");
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (!Array.isArray(users)){
      users = [];
    }

    const userExits = users.some((u) => u.email === user.email);
    if(userExits) {
      alert('User with this email already exits. Please login in.');
     
      navigate('/');
    }

    users.push(user)

    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup Successfull! You can now Login.");
    setUser({ username: '', email:'', password:''})
    navigate('/');
  };

  return (
    <div className="sign-template">
      <div className="sign">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up Form</h1>
          <label>User Name</label>
          <input
            type="text"
            placeholder="Enter the User Name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />{" "}
          <br />
          <label> Enter Mail</label>
          <input
            type="email"
            placeholder="Enter Ypur Mail"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />{" "}
          <br />
          <label> Set Password</label>
          <input
            type="password"
            placeholder="Enter the Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />{" "}
          <br />
          <button type="submit">Sign Up</button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
