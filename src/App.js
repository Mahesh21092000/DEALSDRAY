import Login from './components/Login'
import React, { useState } from 'react';
import Signup from './components/Signup'
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeList from './components/EmployeList';
import NewEmploye from './components/NewEmploye';

function App() {
  const [employees, setEmployees] = useState([]);

  
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };
  return (
   <Router>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/employelist' element= {<EmployeList/>} />
    <Route path='/newemploye' element= {<NewEmploye  addEmployee={addEmployee}/>} />
    </Routes>
   
    
   </Router>
  );
}

export default App;
