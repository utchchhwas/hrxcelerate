import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import EditApplicantInputs from "./EditApplicantInputs";

function EditApplicant() {
  return (
    <div>
      <Navbar />
      <h1>Review Application</h1>
      <EditApplicantInputs />
    </div>
  );
}

export default EditApplicant
