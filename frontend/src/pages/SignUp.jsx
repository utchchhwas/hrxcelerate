import { Fragment } from 'react';
import {
  Link as RouterLink,
  Form as RouterForm,
  redirect,
  useActionData,
} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let errors = {};
  Object.keys(data).forEach((key) => {
    errors[key] = [];
  });

  for (const [key, value] of Object.entries(data)) {
    if (value === '') {
      errors[key].push('This field cannot be empty.');
    }
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword.push("The passwords don't match.");
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  return null;
  return redirect('/login');
};

const SignUp = () => {
  const errors = useActionData();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          src='logo-full.png'
          alt='HRXcelerate full logo.'
          sx={{
            width: 200,
            mb: 3,
          }}
        />
        <Typography component='h1' variant='h5'>
          Create Account
        </Typography>
        <Box component={RouterForm} method='post' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Company Name */}
            <Grid item xs={12}>
              <TextField
                id='companyName'
                name='companyName'
                label='Company Name'
                required
                fullWidth
                autoFocus
                error={errors?.companyName && errors.companyName.length !== 0}
                helperText={errors?.companyName.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                id='firstName'
                name='firstName'
                label='First Name'
                required
                fullWidth
                error={errors?.firstName && errors.firstName.length !== 0}
                helperText={errors?.firstName.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                id='lastName'
                name='lastName'
                label='Last Name'
                required
                fullWidth
                error={errors?.lastName && errors.lastName.length !== 0}
                helperText={errors?.lastName.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                id='email'
                type='email'
                name='email'
                label='Email Address'
                required
                fullWidth
                error={errors?.email && errors.email.length !== 0}
                helperText={errors?.email.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <TextField
                id='password'
                type='password'
                name='password'
                label='Password'
                required
                fullWidth
                error={errors?.password && errors.password.length !== 0}
                helperText={errors?.password.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                label='Confirm Password'
                required
                fullWidth
                error={
                  errors?.confirmPassword && errors.confirmPassword.length !== 0
                }
                helperText={errors?.confirmPassword.map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
