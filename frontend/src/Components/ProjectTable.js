// Project Table Component
// Project View Component
//     - id
//     - name
//     - company
//     - manager (employee)
//     - start date
//     - end date
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TextField,
    InputAdornment,
    Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function ProjectTable() {
    const [projects, setProjects] = useState([]);
    const [orderBy, setOrderBy] = useState("id");
    const [order, setOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        console.log("Fetching data from API...");

        const accessToken = localStorage.getItem("accessToken");

        axios
            .get("http://127.0.0.1:8000/api/projects/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log("Data fetched:", response.data.results);
                setProjects(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    return (
        <div>
            <h1>Project Table</h1>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "id"}
                                    direction={orderBy === "id" ? order : "asc"}
                                    onClick={() => handleSort("id")}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow
                                key={project.id}
                                onClick={() => setSelectedProject(project.id)}
                                selected={selectedProject === project.id}
                            >
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}


export default ProjectTable;


