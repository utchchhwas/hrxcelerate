import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function EmployeeInputs() {
  const [companies, setCompanies] = useState([]);
  const [managers, setManagers] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    manager: null,
    is_owner: false,
    is_admin: false,
    is_active: false,
    gender: "",
    date_of_birth: "",
    avatar: null,
  });

  useEffect(() => {
    console.log("Fetching company and manager data...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/companies/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Companies fetched:", response.data.results);
        setCompanies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Managers fetched:", response.data.results);
        setManagers(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleAvatarChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting employee data...", userData);

    // Implement the POST request to add employee here
  };

  return (
    <div className="container">
      <Form className="employee-form">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="manager">
          <Form.Label>Manager</Form.Label>
          <Form.Control
            as="select"
            name="manager"
            value={userData.manager}
            onChange={handleInputChange}
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.user.first_name} {manager.user.last_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="is_owner">
          <Form.Check
            type="checkbox"
            name="is_owner"
            label="Owner"
            checked={userData.is_owner}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="is_admin">
          <Form.Check
            type="checkbox"
            name="is_admin"
            label="Admin"
            checked={userData.is_admin}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="is_active">
          <Form.Check
            type="checkbox"
            name="is_active"
            label="Active"
            checked={userData.is_active}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="date_of_birth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            value={userData.date_of_birth}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EmployeeInputs;
