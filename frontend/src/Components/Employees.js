import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EmployeeList from "./EmployeeList";

function Employees() {
  return (
    <div>
        <Navbar />
        <h1>Employees</h1>
        <EmployeeList />
    </div>
  );
}

export default Employees;