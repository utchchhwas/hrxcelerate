import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EmployeeInputs from "./EmployeeInputs";

function AddEmployee() {
  return (
    <div>
      <Navbar />
      <h1>Add Employee</h1>
      <EmployeeInputs />
    </div>
  );
}

export default AddEmployee;