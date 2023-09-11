import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EmploymentInputs() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employmentData, setEmploymentData] = useState({
    employee: employeeId,
    job_role: "",
    // ... other fields ...
  });

  const [jobRoles, setJobRoles] = useState([]); // State to store job roles

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
        console.log("Job roles:", jobRolesData);
        setJobRoles(jobRolesData);
      })
      .catch((error) => {
        console.error("Error fetching job roles:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    // Send POST request to create a new employment
    axios
      .post("http://127.0.0.1:8000/api/employments/", employmentData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("New employment added:", response.data);
        // Redirect to the employee page or wherever needed
        navigate(`/employee/employment/${employeeId}`);
      })
      .catch((error) => {
        console.error("Error adding new employment:", error);
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
            value={employmentData.job_role}
            onChange={(e) =>
              setEmploymentData({ ...employmentData, job_role: e.target.value })
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
        <Form.Group controlId="is_active">
          <Form.Check
            type="checkbox"
            name="is_active"
            label="Active"
            checked={employmentData.is_active}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                is_active: e.target.checked,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={employmentData.start_date}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                start_date: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={employmentData.end_date}
            onChange={(e) =>
              setEmploymentData({ ...employmentData, end_date: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="employment_type">
          <Form.Label>Employment Type</Form.Label>
          <Form.Control
            as="select"
            name="employment_type"
            value={employmentData.employment_type}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                employment_type: e.target.value,
              })
            }
          >
            <option value="">Select Employment Type</option>
            <option value="FT">Full-Time</option>
            <option value="PT">Part-Time</option>
            <option value="IS">Internship</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="is_remote">
          <Form.Check
            type="checkbox"
            name="is_remote"
            label="Remote"
            checked={employmentData.is_remote}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                is_remote: e.target.checked,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            name="salary"
            value={employmentData.salary}
            onChange={(e) =>
              setEmploymentData({ ...employmentData, salary: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="salary_currency">
          <Form.Label>Salary Currency</Form.Label>
          <Form.Control
            type="text"
            name="salary_currency"
            value={employmentData.salary_currency}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                salary_currency: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="salary_frequency">
          <Form.Label>Salary Frequency</Form.Label>
          <Form.Control
            as="select"
            name="salary_frequency"
            value={employmentData.salary_frequency}
            onChange={(e) =>
              setEmploymentData({
                ...employmentData,
                salary_frequency: e.target.value,
              })
            }
          >
            <option value="">Select Salary Frequency</option>
            <option value="H">Hourly</option>
            <option value="D">Daily</option>
            <option value="W">Weekly</option>
            <option value="B">Bi-weekly</option>
            <option value="M">Monthly</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Label>Employment Note</Form.Label>
          <Form.Control
            as="textarea"
            name="note"
            value={employmentData.note}
            onChange={(e) =>
              setEmploymentData({ ...employmentData, note: e.target.value })
            }
            maxLength="500"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default EmploymentInputs;
