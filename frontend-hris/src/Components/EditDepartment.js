import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EditDepartmentInputs from "./EditDepartmentInputs";

function EditDepartment() {
  return (
    <div>
      <Navbar />
      <h1>Edit Department</h1>
      <EditDepartmentInputs />
    </div>
  );
}

export default EditDepartment;
