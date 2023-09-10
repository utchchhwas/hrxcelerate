import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditApplicantInputs() {
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    resume: null, // Use null for file input
    status: "",
  });

  useEffect(() => {
    // Fetch applicant data by ID
    axios
      .get(`http://127.0.0.1:8000/api/applicants/${id}/`)
      .then((response) => {
        const { email, first_name, last_name, resume, status } = response.data;
        setApplicantData({
          email,
          first_name,
          last_name,
          resume: null, // Set to null to avoid showing file path
          status,
        });
      })
      .catch((error) => {
        console.error("Error fetching applicant data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setApplicantData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file input separately
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to handle file input
    const formData = new FormData();
    formData.append("email", applicantData.email);
    formData.append("first_name", applicantData.first_name);
    formData.append("last_name", applicantData.last_name);
    formData.append("resume", applicantData.resume);
    formData.append("status", applicantData.status);

    // Send PUT request to update applicant data
    axios
      .put(`http://127.0.0.1:8000/api/applicants/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      })
      .then((response) => {
        console.log("Applicant data updated:", response.data);
        // Redirect or perform any other actions after updating
      })
      .catch((error) => {
        console.error("Error updating applicant data:", error);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={applicantData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={applicantData.first_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={applicantData.last_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="resume">
          <Form.Label>Resume (PDF)</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={applicantData.status}
            onChange={handleInputChange}
          >
            <option value="A">Applied</option>
            <option value="Q">Qualified</option>
            <option value="I">Interviewing</option>
            <option value="S">Short-listed</option>
            <option value="O">Offered</option>
            <option value="H">Hired</option>
            <option value="R">Rejected</option>
            <option value="D">Denied</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default EditApplicantInputs;
