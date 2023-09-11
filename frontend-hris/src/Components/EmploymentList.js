import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import EmploymentCard from './EmploymentCard';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ApplicantsStyle.css';

function EmploymentList() {
  const [employments, setEmployments] = useState([]);
  const { employeeId } = useParams(); // Get the employee ID from the URL

  useEffect(() => {
    console.log('Fetching employment data from API...');

    const accessToken = localStorage.getItem('accessToken');

    axios
      .get(
        `http://127.0.0.1:8000/api/employments/?employee=${employeeId}&expand=job_role`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log('Employment data fetched:', response.data.results);
        setEmployments(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching employment data:', error);
      });
  }, [employeeId]);

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          <h2>Employment List for Employee ID {employeeId}</h2>
        </Col>
        <Col
          className='text-right'
          style={{ marginRight: '50px', marginTop: '10px' }}
        >
          {/* Add button with Link */}
          <Link
            to={`/employee/employment/add/${employeeId}`}
            className='btn btn-primary'
          >
            Add
          </Link>
        </Col>
      </Row>
      <div className='card-container'>
        {employments.map((employment) => (
          <EmploymentCard employment={employment} />
        ))}
      </div>
    </Container>
  );
}

export default EmploymentList;
