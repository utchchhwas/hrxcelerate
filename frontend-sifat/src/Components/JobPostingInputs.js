import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function JobPostingInputs() {
  const [jobPostingData, setJobPostingData] = useState({
    job_role: "",
    tags: "",
    description: "",
    is_active: false,
  });

  const [jobRoles, setJobRoles] = useState([]); // State to store job roles
  const navigate = useNavigate();

  // Fetch job roles from the API
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/job-roles/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const jobRolesData = response.data.results;
        setJobRoles(jobRolesData);
      })
      .catch((error) => {
        console.error("Error fetching job roles:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    // Send POST request to create a new job posting
    axios
      .post("http://127.0.0.1:8000/api/job-postings/", jobPostingData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("New job posting added:", response.data);
        navigate(`/jobpostings`);
      })
      .catch((error) => {
        console.error("Error adding new job posting:", error);
      });
  };

  return (
    <Container style={{ width: "60%", marginTop: "50px" }}>
      <Form onSubmit={handleSubmit}>
        {/* Job Role Dropdown */}
        <Form.Group controlId="job_role">
          <Form.Label>Job Role</Form.Label>
          <Form.Control
            as="select"
            name="job_role"
            value={jobPostingData.job_role}
            onChange={(e) =>
              setJobPostingData({ ...jobPostingData, job_role: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Job Role
            </option>
            {jobRoles.map((jobRole) => (
              <option key={jobRole.id} value={jobRole.id}>
                {jobRole.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* Tags */}
        <Form.Group controlId="tags">
          <Form.Label>Job Posting Tags</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={jobPostingData.tags}
            onChange={(e) =>
              setJobPostingData({ ...jobPostingData, tags: e.target.value })
            }
            maxLength="1000"
          />
        </Form.Group>
        {/* Description */}
        <Form.Group controlId="description">
          <Form.Label>Job Posting Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={jobPostingData.description}
            onChange={(e) =>
              setJobPostingData({
                ...jobPostingData,
                description: e.target.value,
              })
            }
          />
        </Form.Group>
        {/* Is Active Checkbox */}
        <Form.Group controlId="is_active">
          <Form.Check
            type="checkbox"
            name="is_active"
            label="Active"
            checked={jobPostingData.is_active}
            onChange={(e) =>
              setJobPostingData({
                ...jobPostingData,
                is_active: e.target.checked,
              })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default JobPostingInputs;
