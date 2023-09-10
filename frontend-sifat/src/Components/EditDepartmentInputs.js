import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditDepartmentInputs() {
  const [companyID, setCompanyID] = useState(null);
  const { departmentID } = useParams(); // Get the department ID from the dynamic route
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    console.log("Fetching department data for edit...");

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(`http://127.0.0.1:8000/api/departments/${departmentID}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Department data fetched for edit:", response.data);
        const department = response.data;
        setDepartmentData({
          name: department.name,
          description: department.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching department data for edit:", error);
      });

      axios
        .get("http://127.0.0.1:8000/api/employees/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        })
        .then((response) => {
          const companyId =
            response.data.results[0] && response.data.results[0].company;
          if (companyId) {
            console.log("Company ID fetched:", companyId);
            setCompanyID(companyId);
          }
        })
        .catch((error) => {
          console.error("Error fetching company ID:", error);
        });
  }, [departmentID]);

  const handleUpdateDepartment = () => {
    console.log("Updating department...");

    const updatedDepartment = {
        company: companyID,
        name: departmentData.name,
        description: departmentData.description,
    };

    const accessToken = localStorage.getItem("accessToken");

    axios
      .put(
        `http://127.0.0.1:8000/api/departments/${departmentID}/`,
        updatedDepartment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Department updated:", response.data);
        // Redirect to the department details page or wherever needed
        navigate(`/departments`);
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={departmentData.name}
              onChange={(e) =>
                setDepartmentData({ ...departmentData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              value={departmentData.description}
              onChange={(e) =>
                setDepartmentData({
                  ...departmentData,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleUpdateDepartment}>
            Update
          </button>
        </div>
      </div>
    </div>
  );

}

export default EditDepartmentInputs;
