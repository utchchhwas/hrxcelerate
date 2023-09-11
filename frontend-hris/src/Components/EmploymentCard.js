import React from "react";
import { Card } from "react-bootstrap";
import "./ApplicantsStyle.css"

function EmploymentCard({ employment }) {
  return (
    <Card>
      <Card.Header>Employment ID: {employment.id}</Card.Header>
      <Card.Body>
        <Card.Title>Active: {employment.is_active ? "Yes" : "No"}</Card.Title>
        <Card.Text>
          Job Role: {employment.job_role}
          <br />
          Start Date: {employment.start_date}
          <br />
          End Date: {employment.end_date}
          <br />
          Employment Type: {employment.employment_type}
          <br />
          Remote: {employment.is_remote ? "Yes" : "No"}
          <br />
          Salary: {employment.salary} {employment.salary_currency}
          <br />
          Salary Frequency: {employment.salary_frequency}
          <br />
          Note: {employment.note}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EmploymentCard;
