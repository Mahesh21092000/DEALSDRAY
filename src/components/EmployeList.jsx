import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import "./employee.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load employees when component mounts
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Handle delete employee
  const handleDelete = (email) => {
    const updatedEmployees = employees.filter((emp) => emp.email !== email);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  // Handle edit employee
  const handleEdit = (email) => {
    const editedEmployee = prompt('Enter new details (name, mobile, course)', 'e.g. John Doe, 1234567890, MCA');
    if (!editedEmployee) return;
    
    const [name, mobile, course] = editedEmployee.split(',');
    
    const updatedEmployees = employees.map((emp) =>
      emp.email === email ? { ...emp, name: name.trim(), mobile: mobile.trim(), course: course.trim() } : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='employeelist'>
      <Nav />
      <h2>Employee List</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search employees by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Display employee count */}
      <p>Total Employees: {filteredEmployees.length}</p>

      {filteredEmployees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.email}>
                <td>
                  <img
                    src={employee.image || 'https://via.placeholder.com/50'}
                    alt={employee.name}
                    className='employee-image'
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.course}</td>
                <td>
                  <button onClick={() => handleEdit(employee.email)} className='table-btn'>Edit</button>
                  <button onClick={() => handleDelete(employee.email)} className='table-btn1'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees available.</p>
      )}
    </div>
  );
}

export default EmployeeList;
