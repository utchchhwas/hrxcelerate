import { Fragment } from 'react';
import {
  Link as RouterLink,
  Form as RouterForm,
  redirect,
  useActionData,
} from 'react-router-dom';
import axios from 'axios';
import { HttpStatusCode } from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const createCompanyOwner = async (data) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/create-company-owner/',
    { ...data }
  );
  return response;
};

const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const createCompanyOwnerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let formErrors = {};
  Object.keys(data).forEach((key) => {
    formErrors[key] = [];
  });

  for (const [key, value] of Object.entries(data)) {
    if (value === '') {
      formErrors[key].push('This field cannot be empty.');
    }
  }
  if (data.email !== '' && !validateEmail(data.email)) {
    formErrors.email.push('Enter a valid email address.');
  }
  if (data.password !== data.confirmPassword) {
    formErrors.confirmPassword.push("The passwords don't match.");
  }

  if (Object.values(formErrors).some((item) => item.length > 0)) {
    return { formErrors };
  }

  try {
    const response = await createCompanyOwner({
      companyName: data.companyName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    if (error.response.status === HttpStatusCode.BadRequest) {
      for (const [key, value] of Object.entries(error.response.data)) {
        formErrors[key] = formErrors[key].concat(value);
      }
    } else {
      throw error;
    }
  }

  if (Object.values(formErrors).some((item) => item.length > 0)) {
    return { formErrors };
  }

  let passParams = new URLSearchParams();
  passParams.set('from', new URL(request.url).pathname);
  return redirect('/login?' + passParams.toString());
};

const SignUp = () => {
  const actionData = useActionData();

  const formErrors = actionData?.formErrors || {};

  return (
    <Container component='main' maxWidth='sm'>
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
          Create Company Owner Account
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
                error={
                  formErrors?.companyName && formErrors.companyName.length !== 0
                }
                helperText={formErrors?.companyName?.map((item, index) => (
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
                error={
                  formErrors?.firstName && formErrors.firstName.length !== 0
                }
                helperText={formErrors?.firstName?.map((item, index) => (
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
                error={formErrors?.lastName && formErrors.lastName.length !== 0}
                helperText={formErrors?.lastName?.map((item, index) => (
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
                error={formErrors?.email && formErrors.email.length !== 0}
                helperText={formErrors?.email?.map((item, index) => (
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
                error={formErrors?.password && formErrors.password.length !== 0}
                helperText={formErrors?.password?.map((item, index) => (
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
                  formErrors?.confirmPassword &&
                  formErrors.confirmPassword.length !== 0
                }
                helperText={formErrors?.confirmPassword?.map((item, index) => (
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
