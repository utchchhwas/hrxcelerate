import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Container,
  Chip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the ExpandMoreIcon

const JobApplyPage = () => {
  const { id } = useParams(); // Access the "id" parameter from the route
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    // Make an API request to fetch job details based on the id
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/public-job-postings/${id}/`
        );
        const responseData = response.data;
        setJobDetails(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <div style={{ background: '#eeeeee', minHeight: '100vh' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>HRXcelerate - Job Apply</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' style={{ marginTop: '20px' }}>
        {jobDetails && (
          <Card
            sx={{
              width: '100%',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <Avatar
              alt={jobDetails.company.name}
              src={jobDetails.company.logo}
              sx={{
                width: 150,
                height: 150,
                flexShrink: 0,
                p: 2,
                marginBottom: '20px',
              }}
            />
            <Typography variant='h5' gutterBottom>
              {jobDetails.company.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' gutterBottom>
              Job Role: {jobDetails.job_role_name}
            </Typography>
            <Typography
              component='article'
              variant='body2'
              color='textSecondary'
              sx={{ mt: 1 }}
            >
              Tags:{' '}
              {jobDetails.tags.split(', ').map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ mx: '4px', borderRadius: 5 }}
                />
              ))}
            </Typography>
            {/* Description using Accordion */}
            <Accordion sx={{ width: '100%', mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='description-content'
                id='description-header'
              >
                <Typography variant='body1'>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{jobDetails.description}</Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default JobApplyPage;
