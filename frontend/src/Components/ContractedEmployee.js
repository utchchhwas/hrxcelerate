import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "./Employee";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./EmployeeListStyle.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    console.log("Fetching employee data from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/employees/?contract=C", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Employee data fetched:", response.data.results);
        setEmployees(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleSort = (property) => {
    if (orderBy === property) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(property);
      setOrder("asc");
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (order === "asc") {
      if (orderBy === "user.email") {
        return a.user.email.localeCompare(b.user.email);
      }
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      if (orderBy === "user.email") {
        return b.user.email.localeCompare(a.user.email);
      }
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <Container>
      <h2>Employee Sorted With Contract Type</h2>
      <List>
        {sortedEmployees.map((employee) => (
          <ListItem key={employee.id}>
            <Employee
              name={`${employee.user.first_name} ${employee.user.last_name}`}
              email={employee.user.email}
              managerName={employee.manager}
              isOwner={employee.is_owner}
              isAdmin={employee.is_admin}
              isActive={employee.is_active}
              contractType={employee.contract}
              contractStartTime={employee.contract_start_date_str}
              contractEndTime={employee.contract_end_date_str}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default EmployeeList;
