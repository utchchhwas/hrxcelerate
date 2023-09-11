import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import ApplicantsList from "./ApplicantsList";

function Applicants() {
  return (
    <div>
        <Navbar />
        <ApplicantsList />
    </div>
  );
}

export default Applicants;