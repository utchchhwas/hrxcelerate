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
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DepartmentTableStyle.css";

function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    console.log("Fetching data from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/departments/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Data fetched:", response.data.results);
        setDepartments(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedDepartments = [...filteredDepartments].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const handleRowClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleDelete = () => {
    if (selectedDepartment) {
      const accessToken = localStorage.getItem("accessToken");

      axios
        .delete(
          `http://127.0.0.1:8000/api/departments/${selectedDepartment.id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          console.log("Department deleted successfully.");
          setSelectedDepartment(null);

          // Fetch updated data after deletion
          axios
            .get("http://127.0.0.1:8000/api/departments/", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log("Data fetched:", response.data.results);
              setDepartments(response.data.results);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
        });
    }
  };


  return (
    <div>
      <Button
        component={Link}
        to="/department/add"
        variant="contained"
        color="primary"
        sx={{ float: "right", marginBottom: 2 , marginLeft: 2, marginRight: 5}}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ float: "right", marginBottom: 2, marginLeft: 2}}
        onClick={handleDelete}
        disabled={!selectedDepartment}
      >
        Delete
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          placeholder: "Department name",
        }}
        sx={{ float: "right", marginBottom: 2 }}
      />
      <TableContainer>
        <Table className="departments-table">
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
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Department Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDepartments.map((department) => (
              <TableRow
                key={department.id}
                onClick={() => handleRowClick(department)}
                selected={
                  selectedDepartment && selectedDepartment.id === department.id
                }
                hover
              >
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DepartmentTable;
