import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EmployeeList from "./EmployeeList";

function Employee() {
  return (
    <div>
        <Navbar />
        <h1>Employee</h1>
        <EmployeeList />
    </div>
  );
}

export default Employee;