import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";

// Derpartment prints hello world
function Department() {
  return (
    <div>
        <Navbar />
        <h1>Hello World</h1>
    </div>
  );
}

export default Department;