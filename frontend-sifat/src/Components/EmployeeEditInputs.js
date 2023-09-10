import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeInputsStyle.css";

function EmployeeEditInputs() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    user: {
      email: "",
      first_name: "",
      last_name: "",
    },
    company: null,
    manager: "", // Use an empty string initially
    is_owner: false,
    is_admin: false,
    is_active: false,
    gender: "", // Use an empty string initially
    date_of_birth: null,
    avatar: null,
  });

  const [managers, setManagers] = useState([]); // State to store the list of managers
  const [currentManager, setCurrentManager] = useState({}); // State to store the current manager's data

  useEffect(() => {
    console.log("Fetching employee data for edit...");

    const accessToken = localStorage.getItem("accessToken");

    // Fetch employee data
    axios
      .get(`http://127.0.0.1:8000/api/employees/${employeeId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Employee data fetched for edit:", response.data);
        const employee = response.data;
        setEmployeeData({
          user: {
            email: employee.user.email,
            first_name: employee.user.first_name,
            last_name: employee.user.last_name,
          },
          company: employee.company,
          manager: employee.manager, // Set manager as manager's id
          is_owner: employee.is_owner,
          is_admin: employee.is_admin,
          is_active: employee.is_active,
          gender: employee.gender || "", // Set gender as an empty string if it's null
          date_of_birth: employee.date_of_birth,
          avatar: employee.avatar,
        });
      })
      .catch((error) => {
        console.error("Error fetching employee data for edit:", error);
      });

    // Fetch the list of managers
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
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });

    }, []);

    
        



  const handleIsActiveChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      is_active: e.target.checked,
    }));
  };

  const handleGenderChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleManagerChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      manager: e.target.value,
    }));
  };


  const handleSubmit = async () => {
    console.log("Updating employee data...", employeeData);

    const accessToken = localStorage.getItem("accessToken");

    // Create the payload for the PUT request
    const putData = {
      user: {
        email: employeeData.user.email,
        first_name: employeeData.user.first_name,
        last_name: employeeData.user.last_name,
      },
      company: employeeData.company,
      manager: employeeData.manager,
      is_owner: employeeData.is_owner,
      is_admin: employeeData.is_admin,
      is_active: employeeData.is_active,
      gender: employeeData.gender,
      date_of_birth: employeeData.date_of_birth,
    };

    axios
      .put(`http://127.0.0.1:8000/api/employees/${employeeId}/`, putData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Employee updated:", response.data);
        // Redirect to the employee list page or wherever needed
        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="container">
      <Form className="employee-form">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={employeeData.user.email}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={employeeData.user.first_name}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={employeeData.user.last_name}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="manager">
          <Form.Label>Manager</Form.Label>
          <Form.Control
            as="select"
            name="manager"
            value={employeeData.manager} // Should be the manager's email
            onChange={handleManagerChange}
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.user.id}>
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
            checked={employeeData.is_owner}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="is_admin">
          <Form.Check
            type="checkbox"
            name="is_admin"
            label="Admin"
            checked={employeeData.is_admin}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="is_active">
          <Form.Check
            type="checkbox"
            name="is_active"
            label="Active"
            checked={employeeData.is_active}
            onChange={handleIsActiveChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={employeeData.gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Form.Control>
        </Form.Group>
        <Button
            className="submit-button"
            variant="primary"
            onClick={handleSubmit}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

export default EmployeeEditInputs;
