import { Fragment } from 'react';
import {
  Link as RouterLink,
  Form as RouterForm,
  redirect,
  useActionData,
  useLocation,
} from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import authProvider from '../authProvider';
import { validateEmail } from '../utils';
import apiObtainTokenPair from '../api/apiObtainTokenPair';

export const loginLoader = async () => {
  // if (authProvider.isAuthenticated()) {
  //   let passParams = new URLSearchParams();
  //   passParams.set('message', 'You are already logged in.');
  //   return redirect('/portal?' + passParams.toString());
  // }
  return null;
};

export const loginAction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
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

  if (Object.values(formErrors).some((item) => item.length > 0)) {
    return { formErrors };
  }

  try {
    const response = await apiObtainTokenPair({
      email: data.email,
      password: data.password,
    });
    authProvider.signIn(response.data);
  } catch (error) {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      return {
        actionError: 'Invalid email/password.',
      };
    } else {
      throw error;
    }
  }

  return redirect('http://localhost:3000/home');
  // const redirectTo = searchParams.get('from');
  // return redirect(redirectTo || '/portal');
};

const Login = () => {
  const location = useLocation();
  const actionData = useActionData();

  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get('success');
  const errorMessage = searchParams.get('error');

  const formErrors = actionData?.formErrors || {};
  const actionError = actionData?.actionError || null;

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
          Employee Login
        </Typography>
        <Box
          component={RouterForm}
          replace
          method='post'
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {successMessage && (
              <Grid item xs={12}>
                <Alert severity='success'>{successMessage}</Alert>
              </Grid>
            )}
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            )}
            {actionError && (
              <Grid item xs={12}>
                <Alert severity='error'>{actionError}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                id='email'
                type='email'
                name='email'
                label='Email Address'
                required
                fullWidth
                autoFocus
                error={
                  (formErrors?.email && formErrors.email.length !== 0) ||
                  actionError !== null
                }
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
                error={
                  (formErrors?.password && formErrors.password.length !== 0) ||
                  actionError !== null
                }
                helperText={formErrors?.password?.map((item, index) => (
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
            Login
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link
                component={RouterLink}
                to='/create-company-owner'
                variant='body2'
              >
                Have your own company? Create account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
