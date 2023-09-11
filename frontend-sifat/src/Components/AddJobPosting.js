import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import JobPostingInputs from "./JobPostingInputs";

function AddJobPosting() {
    return (
        <div>
        <Navbar />
        <h1>Add Job Posting</h1>
        <JobPostingInputs />
        </div>
    );
}

export default AddJobPosting;
