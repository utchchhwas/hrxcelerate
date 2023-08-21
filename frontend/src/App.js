import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Departments from "./Components/Departments";
import Employee from "./Components/Employees";
import BasicInfo from "./Components/BasicInfo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/basicinfo" element={<BasicInfo />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employee />} />
      </Routes>
    </Router>
  );
};

export default App;
