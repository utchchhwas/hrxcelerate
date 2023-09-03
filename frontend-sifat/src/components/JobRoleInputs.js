import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";

function JobRoleInputs() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [jobRoleName, setJobRoleName] = useState("");
  const [jobRoleDescription, setJobRoleDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching department data from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/departments/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Department data fetched:", response.data.results);
        setDepartments(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, []);

  const handleCreateJobRole = () => {
    console.log("Creating new job role...");

    const newJobRole = {
      department: selectedDepartment,
      name: jobRoleName,
      description: jobRoleDescription,
    };

    const accessToken = localStorage.getItem("accessToken");

    // Send POST request to create a new job role
    axios
      .post("http://127.0.0.1:8000/api/job-roles/", newJobRole, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Job role created:", response.data);
        // Reset form fields
        setSelectedDepartment("");
        setJobRoleName("");
        setJobRoleDescription("");
        // Redirect to /jobroles page or any other desired page
        navigate("/jobroles");
      })
      .catch((error) => {
        console.error("Error creating job role:", error);
      });
  };

  return (
    <Container>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center" style={{ width: "70%" }}>
          <Form>
            <FormGroup row>
              <Label
                for="departmentSelect"
                className="col-sm-4 col-form-label text-right"
              >
                Select Department:
              </Label>
              <div className="col-sm-8">
                <Input
                  type="select"
                  id="departmentSelect"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select...</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Input>
              </div>
            </FormGroup>
            <FormGroup row>
              <Label
                for="jobRoleName"
                className="col-sm-4 col-form-label text-right"
              >
                Job Role Name:
              </Label>
              <div className="col-sm-8">
                <Input
                  type="text"
                  id="jobRoleName"
                  value={jobRoleName}
                  onChange={(e) => setJobRoleName(e.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <Label
                for="jobRoleDescription"
                className="col-sm-4 col-form-label text-right"
              >
                Job Role Description:
              </Label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  id="jobRoleDescription"
                  value={jobRoleDescription}
                  onChange={(e) => setJobRoleDescription(e.target.value)}
                  rows="5" // vertical height
                />
              </div>
            </FormGroup>
            <Button color="primary" onClick={handleCreateJobRole}>
              Create
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default JobRoleInputs;
