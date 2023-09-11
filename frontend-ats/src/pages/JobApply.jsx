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
  Grid,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Alert, // Import Alert component for displaying success message
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { API_ROOT } from '../API';

const JobApplyPage = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [applicantInfo, setApplicantInfo] = useState({
    email: '',
    first_name: '',
    last_name: '',
    resume: null,
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // Track submission success

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          // `http://127.0.0.1:8000/api/public-job-postings/${id}/`
          `${API_ROOT}/public-job-postings/${id}/`
        );
        const responseData = response.data;
        setJobDetails(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setApplicantInfo({
      ...applicantInfo,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('job_posting', id);
    formData.append('email', applicantInfo.email);
    formData.append('first_name', applicantInfo.first_name);
    formData.append('last_name', applicantInfo.last_name);
    formData.append('resume', applicantInfo.resume);

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/public-applicants/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Handle successful submission
      setSubmissionSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, e.g., show an error message
    }
  };

  return (
    <div style={{ background: '#fefefe', minHeight: '100vh' }}>
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
              border: '2px solid #e0e0e0',
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

        {/* Display success message if submission is successful */}
        {submissionSuccess && (
          <Alert
            severity='success'
            sx={{
              width: '100%',
              mt: 2,
              marginBottom: '20px',
            }}
          >
            Application submitted successfully!
          </Alert>
        )}

        {/* Job Application Form */}
        {!submissionSuccess && ( // Display the form if submission is not successful
          <Card
            sx={{
              width: '100%',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              my: '30px',
            }}
          >
            <Typography variant='h5' gutterBottom>
              Job Application
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} maxWidth={400}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    name='email'
                    type='email'
                    required
                    onChange={handleInputChange}
                    value={applicantInfo.email}
                    margin='normal'
                    size='small'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label='First Name'
                    name='first_name'
                    onChange={handleInputChange}
                    value={applicantInfo.first_name}
                    margin='normal'
                    size='small'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label='Last Name'
                    name='last_name'
                    onChange={handleInputChange}
                    value={applicantInfo.last_name}
                    margin='normal'
                    size='small'
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type='file'
                    accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    name='resume'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Submit Application
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default JobApplyPage;
