import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EmployeeEditInputs from "./EmployeeEditInputs";

function EditEmployee() {
  return (
    <div>
      <Navbar />
      <h1>Edit Employee</h1>
      <EmployeeEditInputs />
    </div>
  );
}

export default EditEmployee;
