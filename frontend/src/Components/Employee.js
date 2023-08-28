import React from "react";
import { Typography } from "@mui/material";

function Employee(props) {
  const { name, email, managerName, isOwner, isAdmin, isActive } = props;

  return (
    <div className="employee-box">
      <div className="left-column">
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manager: {managerName || "None"}
        </Typography>
      </div>
      <div className="right-column">
        <Typography variant="body2">
          {isOwner ? "Owner" : isAdmin ? "Admin" : "Employee"}
        </Typography>
        <Typography variant="body2">
          {isActive ? "Active" : "Inactive"}
        </Typography>
      </div>
    </div>
  );
}

export default Employee;
