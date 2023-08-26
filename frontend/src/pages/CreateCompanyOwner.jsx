import { Fragment } from 'react';
import {
  Link as RouterLink,
  Form as RouterForm,
  redirect,
  useActionData,
} from 'react-router-dom';

import { HttpStatusCode } from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { validateEmail } from '../utils';
import apiCreateCompanyOwner from '../api/apiCreateCompanyOwner';

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
    const response = await apiCreateCompanyOwner({
      company_name: data.companyName,
      first_name: data.firstName,
      last_name: data.lastName,
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
  passParams.set(
    'success',
    'Accounted created successfully. You can login now.'
  );
  return redirect('/login?' + passParams.toString());
};

const SignUp = () => {
  const actionData = useActionData();

  const formErrors = actionData?.formErrors;

  return (
    <Container component='main' maxWidth='xs'>
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
