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
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center" style={{ width: "70%" }}>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label text-right">Name:</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label text-right">
              Description:
            </label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                name="description"
                value={departmentDescription}
                onChange={(e) => setDepartmentName(e.target.value)}
                rows="5" // vertical height
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleCreateDepartment}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default DepartmentInputs;
