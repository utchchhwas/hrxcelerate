import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  TextareaAutosize,
  Button,
  Container,
  Grid,
} from "@mui/material";
import Navbar from "./Navbar";

function Company() {
  const [companyData, setCompanyData] = useState({
    id: null,
    name: "",
    motto: "",
    description: "",
    website: "",
    address: "",
  });

  useEffect(() => {
    console.log("Fetching company ID from /employees API...");

    const accessToken = localStorage.getItem("accessToken"); // Get the access token from local storage

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
          console.log("Fetching company data from API...");

          axios
            .get(`http://127.0.0.1:8000/api/companies/${companyId}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log("Company data fetched:", response.data);
              setCompanyData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching company data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching company ID:", error);
      });
  }, []);

  const handleUpdate = () => {
    console.log("Updating company data...");

    axios
      .put(
        `http://127.0.0.1:8000/api/companies/${companyData.id}/`,
        companyData
      ) // Replace with the actual API endpoint
      .then((response) => {
        console.log("Company data updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating company data:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center" style={{ width: "70%" }}>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-right">Name:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="name"
              value={companyData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-right">Motto:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="motto"
              value={companyData.motto}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-right">
            Description:
          </label>
          <div className="col-sm-8">
            <textarea
              className="form-control"
              name="description"
              value={companyData.description}
              onChange={handleChange}
              rows="5" // vertical height
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-right">Website:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="website"
              value={companyData.website}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-right">Address:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="address"
              value={companyData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Company;
