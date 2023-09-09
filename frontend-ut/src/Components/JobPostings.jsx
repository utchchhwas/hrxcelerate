import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./Navbar";
import JobPostingList from "./JobPostingList";

function JobPostings() {
  return (
    <div>
      <Navbar />
      <JobPostingList />
    </div>
  );
}

export default JobPostings;
