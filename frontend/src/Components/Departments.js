import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import DepartmentTable from "./DepartmentTable";

// Derpartment prints hello world
function Department() {
  return (
    <div>
        <Navbar />
        <h1>Departments</h1>
        {/* Make Three vertical segment and put Department table in middle table */}
        <DepartmentTable />
    </div>
  );
}

export default Department;