import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import DepartmentInputs from "./DepartmentInputs";

function AddDepartment() {
  return (
    <div>
      <Navbar />
      <h1>Add Department</h1>
      <DepartmentInputs />
    </div>
  );
}

export default AddDepartment;
