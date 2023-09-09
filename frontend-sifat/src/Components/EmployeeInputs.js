import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeInputsStyle.css";

function EmployeeInputs() {
  const [managers, setManagers] = useState([]);
  const [userData, setUserData] = useState({
    user: {
      email: "",
      first_name: "",
      last_name: "",
    },
    company: null,
    manager: null,
    is_owner: false,
    is_admin: false,
    is_active: false,
    gender: "",
    date_of_birth: null,
    avatar: null,
  });

  useEffect(() => {
    console.log("Fetching manager data...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const fetchedManagers = response.data.results;
        console.log("Managers fetched:", fetchedManagers);
        setManagers(fetchedManagers);
        // Fetch the company ID from the logged-in employee's data
        var companyId = response.data.results[0]
          ? response.data.results[0].company
          : null;
        if (companyId) {
          console.log("Company ID fetched:", companyId);
          setUserData((prevData) => ({
            ...prevData,
            company: companyId,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is for user-related fields, update the user object
    if (name === "email" || name === "first_name" || name === "last_name") {
      setUserData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [name]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? e.target.checked : value,
      }));
    }

    if (name === "manager") {
      // Update the manager field with the selected manager's email
      setUserData((prevData) => ({
        ...prevData,
        manager: value,
      }));
    }
  };


  const handleAvatarChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting employee data...", userData);

    const accessToken = localStorage.getItem("accessToken");

    const postData = {
      user: {
        email: userData.user.email,
        first_name: userData.user.first_name,
        last_name: userData.user.last_name,
      },
      company: userData.company,
      manager: userData.manager,
      is_owner: userData.is_owner,
      is_admin: userData.is_admin,
      is_active: userData.is_active,
      gender: userData.gender,
      date_of_birth: userData.date_of_birth,
    };

    axios
      .post("http://127.0.0.1:8000/api/employees/", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Employee created:", response.data);
        // Redirect to the employee list page
        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };


  const navigate = useNavigate();

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
            value={userData.manager} // Should be the manager's email
            onChange={handleInputChange}
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.user.email}>
                {manager.user.email}
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
