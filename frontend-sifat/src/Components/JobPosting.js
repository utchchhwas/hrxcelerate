import React from "react";
import { Typography, ListItemText } from "@mui/material";

function JobPosting(props) {
  const { jobRole, tags, description, isActive } = props;

  return (
    <div className="job-posting-box">
      <div className="left-column">
        <Typography variant="h6">Job Role: {jobRole}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Tags: {tags || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {description || "N/A"}
        </Typography>
      </div>
      <div className="right-column">
        <Typography variant="body2">
          {isActive ? "Active" : "Inactive"}
        </Typography>
      </div>
    </div>
  );
}

export default JobPosting;
