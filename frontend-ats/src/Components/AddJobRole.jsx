import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import JobRoleInputs from "./JobRoleInputs";

function AddJobRole() {
  return (
    <div>
      <Navbar />
      <h1>Add Job Role</h1>
      <JobRoleInputs />
    </div>
  );
}

export default AddJobRole;
