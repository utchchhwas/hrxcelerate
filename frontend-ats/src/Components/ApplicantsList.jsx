import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import "./ApplicantsStyle.css";

function ApplicantsList() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    console.log("Fetching applicants from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/applicants/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Applicants fetched:", response.data.results);
        setApplicants(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
      });
  }, []);

  return (
    <Container>
      <h2>Applicants List</h2>
      <div className="card-container">
        {applicants.map((applicant) => (
          <Card key={applicant.id} className="mb-3">
            <Card.Header>Applicant ID: {applicant.id}</Card.Header>
            <Card.Body>
              <Card.Title>
                {applicant.first_name} {applicant.last_name}
              </Card.Title>
              <Card.Text>Email: {applicant.email}</Card.Text>
              <Card.Text>Status: {applicant.status}</Card.Text>
              <Card.Text>
                Applied At: {new Date(applicant.applied_at).toLocaleString()}
              </Card.Text>
              {/* <Button variant="primary">View Details</Button> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ApplicantsList;
