import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EmploymentInputs from "./EmploymentInputs";

function AddEmployment() {
  return (
    <div>
      <Navbar />
      <h1>Add Employment</h1>
      <EmploymentInputs />
    </div>
  );
}

export default AddEmployment;
