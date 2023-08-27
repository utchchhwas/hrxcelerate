import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Departments from "./Components/Departments";
import Employee from "./Components/Employees";
import BasicInfo from "./Components/BasicInfo";
import AddDepartment from "./Components/AddDepartment";
import JobRoles from "./Components/JobRoles";
import AddJobRole from "./Components/AddJobRole";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., access token exists)
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        {authenticated ? (
          <>
            <Route path="/home" element={<BasicInfo />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/department/add" element={<AddDepartment />} />
            <Route path="/jobroles" element={<JobRoles />} />
            <Route path="/jobroles/add" element={<AddJobRole />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;