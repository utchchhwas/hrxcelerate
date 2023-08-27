import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, List, ListItem, ListItemText, autocompleteClasses } from "@mui/material";
import { Link } from "react-router-dom";
import "./JobRoleListStyle.css";

function JobRoleList() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    console.log("Fetching job entries from API...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/job-roles/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Job entries fetched:", response.data.results);
        setJobs(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching job entries:", error);
      });
  }, []);

  const handleDelete = () => {
  if (selectedJobId !== null) {
    console.log("Deleting selected job entry...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .delete(`http://127.0.0.1:8000/api/job-roles/${selectedJobId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Job entry deleted:", response.data);
        setSelectedJobId(null); // Clear the selection after deletion

        // Fetch updated job entries and refresh the list
        axios
          .get("http://127.0.0.1:8000/api/job-roles/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log("Job entries fetched:", response.data.results);
            setJobs(response.data.results);
          })
          .catch((error) => {
            console.error("Error fetching job entries:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting job entry:", error);
      });
  }
};


  return (
    <Container>
      <h2>Job Role List</h2>
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
          to="/jobroles/add"
          variant="contained"
          sx={{ float: "right", marginBottom: 2 , marginLeft: 2, marginRight: 5}}
        >
          Add
        </Button>
      </div>
      <div className="list-container">
        <List>
          {jobs.map((job) => (
            <ListItem
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`job-list-item ${
                job.id === selectedJobId ? "selected" : ""
              }`}
            >
              <ListItemText primary={job.name} secondary={job.description} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default JobRoleList;
