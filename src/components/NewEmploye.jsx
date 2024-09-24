import React, { useState } from "react";
import "./employee.css";
import Nav from "./Nav";

function NewEmployee({ addEmployee }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "", // This will hold the base64 string
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Convert image to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const existingEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  
    // Check for duplicates
    const duplicate = existingEmployees.find(
      (emp) => emp.email === formData.email || emp.mobile === formData.mobile
    );
  
    if (duplicate) {
      setError("Employee with this email or mobile number already exists!");
      return;
    }
  
    // Remove image from formData for now
    const { image, ...employeeDataWithoutImage } = formData;
  
    // Add employee to localStorage (without image)
    const updatedEmployees = [...existingEmployees, employeeDataWithoutImage];
  
    try {
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    } catch (error) {
      console.error("Error saving to localStorage", error);
      setError("Storage limit exceeded. Please clear some data.");
      return;
    }
  
    addEmployee(employeeDataWithoutImage); 
  
    // Reset form
    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      course: "",
      image: "",
    });
    setError("");
  };
  

  return (
    <div className="Employelist">
      <Nav />
      <h2>New Employee Form</h2>
      <form onSubmit={handleSubmit} className="form-data">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="from-designation">
          <label>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="UI Developer">UI Developer</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />{" "}
          Female
        </div>
        <div className="form-course">
          <label>Course</label>
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        <br />
        <div className="from-image">
          <label>Img Upload</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        <button type="submit" className="employe-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewEmployee;
