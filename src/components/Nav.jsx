import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./employee.css";

function Nav() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.name); 
    }
  }, []);

  const handleNewEmployee = () => {
    navigate("/newemploye");
  };

  const handleEmployeeList = () => {
    navigate("/employelist");
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
   
    localStorage.removeItem("user");
    localStorage.removeItem("employees");
    navigate("/"); // Redirect to login page after logging out
  };

  return (
    <div>
      <div className="nav-dash">
        <h5 onClick={handleDashboard} style={{ cursor: 'pointer' }}>Home</h5>
        <ul>
          <li onClick={handleEmployeeList}>Employee List</li>
          <li onClick={handleNewEmployee}>New Employee</li>
          
          <li>{username ? username : "Guest"}</li>
         
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
