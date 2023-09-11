import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import JobPosting from "./JobPosting"; // Import the JobPosting component
import "./JobPostingStyle.css";

function JobPostingList() {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    console.log("Fetching job postings from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/job-postings/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Job postings fetched:", response.data.results);
        setJobPostings(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching job postings:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/job-roles/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Job roles fetched:", response.data.results);
        setJobRoles(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching job roles:", error);
      });
  }, []);

  const handleDelete = () => {
    if (selectedJobId !== null) {
      console.log("Deleting selected job posting...");

      const accessToken = localStorage.getItem("accessToken");

      axios
        .delete(`http://127.0.0.1:8000/api/job-postings/${selectedJobId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Job posting deleted:", response.data);
          setSelectedJobId(null); // Clear the selection after deletion

          // Fetch updated job postings and refresh the list
          axios
            .get("http://127.0.0.1:8000/api/job-postings/", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log("Job postings fetched:", response.data.results);
              setJobPostings(response.data.results);
            })
            .catch((error) => {
              console.error("Error fetching job postings:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting job posting:", error);
        });
    }
  };

  return (
    <Container>
      <h2>Job Posting List</h2>
      <div className="button-container">
        <Button
          variant="contained"
          onClick={handleDelete}
          disabled={selectedJobId === null}
          sx={{ float: "right", marginBottom: 2, marginLeft: 2 }}
        >
          Delete
        </Button>
        <Button
          component={Link}
          to="/jobposting/add"
          variant="contained"
          sx={{
            float: "right",
            marginBottom: 2,
            marginLeft: 2,
            marginRight: 5,
          }}
        >
          Add
        </Button>
      </div>
      <div className="list-container">
        <List>
          {jobPostings.map((jobPosting) => (
            <ListItem
              key={jobPosting.id}
              onClick={() => setSelectedJobId(jobPosting.id)}
              className={`job-list-item ${
                jobPosting.id === selectedJobId ? "selected" : ""
              }`}
            >
              <JobPosting
                jobRole={
                  jobRoles.find(function(role) {
                    return role.id === jobPosting.job_role;
                  }) !== undefined
                    ? jobRoles.find(function(role) {
                        return role.id === jobPosting.job_role;
                      }).name
                    : "Unknown Role"
                }
                tags={jobPosting.tags}
                description={jobPosting.description}
                isActive={jobPosting.is_active}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default JobPostingList;
