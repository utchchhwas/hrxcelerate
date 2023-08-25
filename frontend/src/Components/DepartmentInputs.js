import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  TextareaAutosize,
  Button,
  Container,
  Grid,
} from "@mui/material";

function DepartmentInputs() {
  const [companyID, setCompanyID] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching company ID from /employees API...");

    const accessToken = localStorage.getItem("accessToken"); // Get the access token from local storage

    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      })
      .then((response) => {
        const companyId =
          response.data.results[0] && response.data.results[0].company;
        if (companyId) {
          console.log("Company ID fetched:", companyId);
          setCompanyID(companyId);
        }
      })
      .catch((error) => {
        console.error("Error fetching company ID:", error);
      });
  }, []);

  const handleCreateDepartment = () => {
    console.log("Creating new department...");

    const newDepartment = {
      company: companyID,
      name: departmentName,
      description: departmentDescription,
    };

    const accessToken = localStorage.getItem("accessToken"); // Get the access token from local storage

    // Send POST request to create a new department
    axios
      .post("http://127.0.0.1:8000/api/departments/", newDepartment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Department created:", response.data);
        // Reset form fields
        setDepartmentName("");
        setDepartmentDescription("");
        // Redirect to /departments page
        navigate("/departments");
      })
      .catch((error) => {
        console.error("Error creating department:", error);
      });
  };

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div className="text-center">
            <TextField
              label="Department Name"
              fullWidth
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextareaAutosize
              placeholder="Department Description"
              minRows={5}
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e.target.value)}
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCreateDepartment}
              sx={{ marginBottom: 2 }}
            >
              Create Department
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DepartmentInputs;
