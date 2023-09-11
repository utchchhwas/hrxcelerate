import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditApplicantInputs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicantData, setApplicantData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    resume: "", // Use an empty string for displaying the link
    status: "",
  });

  useEffect(() => {
    console.log("Fetching applicant data for edit...");

    const accessToken = localStorage.getItem("accessToken");

    // Fetch applicant data by ID
    axios
      .get(`http://127.0.0.1:8000/api/applicants/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Applicant data fetched:", response.data);
        const { email, first_name, last_name, resume, status } = response.data;
        setApplicantData({
          email,
          first_name,
          last_name,
          resume, // Set to the resume link
          status,
        });
      })
      .catch((error) => {
        console.error("Error fetching applicant data:", error);
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    // Create a FormData object to handle file input
    const formData = new FormData();
    formData.append("email", applicantData.email);
    formData.append("first_name", applicantData.first_name);
    formData.append("last_name", applicantData.last_name);
    formData.append("status", applicantData.status);

    // Send PUT request to update applicant data
    axios
      .put(`http://127.0.0.1:8000/api/applicants/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Applicant data updated:", response.data);
        // Redirect
        navigate(`/applicants`);
      })
      .catch((error) => {
        console.error("Error updating applicant data:", error);
      });
  };

  return (
    <Container >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={applicantData.email}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={applicantData.first_name}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={applicantData.last_name}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="resume">
          <Form.Label>Resume :</Form.Label>
          {applicantData.resume ? (
            <a
              href={applicantData.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          ) : (
            <span>Not Available</span>
          )}
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={applicantData.status}
            onChange={(e) =>
              setApplicantData({ ...applicantData, status: e.target.value })
            }
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
        <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default EditApplicantInputs;
