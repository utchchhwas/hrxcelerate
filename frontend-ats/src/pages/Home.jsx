import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Button, Typography, Container, Grid, Box } from '@mui/material';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
};

const Home = () => {
  return (
    <Container sx={{ padding: '10px' }}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={12} align='center'>
          <div style={styles.buttonContainer}>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              component={Link}
              to='/job-search'
            >
              Job Search
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              component={Link}
              to='/create-company-owner'
              style={{ marginLeft: '10px' }}
            >
              Sign Up
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              component={Link}
              to='/login'
              style={{ marginLeft: '10px' }}
            >
              Log In
            </Button>
          </div>
        </Grid>
        <Box
          component='img'
          src='logo-full.png'
          alt='HRXcelerate full logo.'
          sx={{
            width: 300,
            mb: 0,
          }}
        />
        <Grid item xs={12} align='center'>
          <Typography variant='h4' gutterBottom>
            An Xcelerated HRIS and ATS.
          </Typography>
        </Grid>
        <Box
          component='img'
          src='home-bg.webp'
          sx={{
            width: '60%',
            mb: 0,
          }}
        />
      </Grid>
    </Container>
  );
};

export default Home;
