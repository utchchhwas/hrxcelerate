import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    console.log("Fetching employee data from API...");

    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        console.log("Employee data fetched:", response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "user.email"}
                direction={orderBy === "user.email" ? order : "asc"}
                onClick={() => handleSort("user.email")}
              >
                Employee Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Is Owner</TableCell>
            <TableCell>Is Admin</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.user.email}</TableCell>
              <TableCell>{employee.is_owner ? "Yes" : "No"}</TableCell>
              <TableCell>{employee.is_admin ? "Yes" : "No"}</TableCell>
              <TableCell>{employee.is_active ? "Yes" : "No"}</TableCell>
              <TableCell>{employee.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeList;
