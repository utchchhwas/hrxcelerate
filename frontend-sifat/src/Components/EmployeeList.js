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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    console.log("Fetching employee data from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/employees/", {
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

  const handleEditClick = () => {
    if (selectedEmployeeId !== null) {
      // Redirect to the edit page with the selected employee's ID
      console.log("Redirecting to edit page for employee ID", selectedEmployeeId);
      window.location.href = `/employee/${selectedEmployeeId}`;
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    console.log("Selected employee ID:", employeeId);
    setSelectedEmployeeId(employeeId);
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
      <h2>Employee List</h2>
      <div>
        <Button variant="contained" onClick={() => handleSort("id")}>
          Sort by ID
        </Button>
        <Button variant="contained" onClick={() => handleSort("user.email")}>
          Sort by Email
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSort("user.first_name")}
        >
          Sort by Name
        </Button>
        <Button
          component={Link}
          to="/employee/add"
          variant="contained"
          color="primary"
          sx={{
            float: "right",
            marginBottom: 2,
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedEmployeeId === null}
          onClick={handleEditClick}
          sx={{
            float: "right",
            marginBottom: 2,
            marginLeft: 2,
          }}
        >
          Edit
        </Button>
      </div>
      <List>
        {sortedEmployees.map((employee) => (
          <ListItem
            key={employee.id}
            onClick={() => handleEmployeeSelect(employee.user.id)}
            className={`employee-list-item ${
              employee.id === selectedEmployeeId ? "selected" : ""
            }`}
          >
            <Employee
              id={employee.id}
              name={`${employee.user.first_name} ${employee.user.last_name}`}
              email={employee.user.email}
              managerName={employee.manager}
              isOwner={employee.is_owner}
              isAdmin={employee.is_admin}
              isActive={employee.is_active}
              // onClick={() => handleEmployeeSelect(employee.id)}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default EmployeeList;
