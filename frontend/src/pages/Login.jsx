import { Fragment } from 'react';
import {
  Link as RouterLink,
  Form as RouterForm,
  redirect,
  useActionData,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { HttpStatusCode } from 'axios';
import { useSignIn } from 'react-auth-kit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { validateEmail, tokenRemainingTime } from '../utils';

const obtainTokenPair = async (data) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/obtain-token-pair/',
    {
      ...data,
    }
  );
  return response;
};

export const loginAction = async ({ request }) => {
  const signIn = useSignIn();

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
    const response = await obtainTokenPair({
      email: data.email,
      password: data.password,
    });
    console.log('response:', response);

    const accessToken = response.data.access;
    console.log('accessToken:', accessToken);
    console.log('remainingTime:', tokenRemainingTime(accessToken));
  } catch (error) {
    console.log(error);
    if (error.response.status === HttpStatusCode.Unauthorized) {
      return {
        error: 'Invalid email/password.',
      };
    } else {
      throw error;
    }
  }

  return null;
};

const Login = () => {
  const location = useLocation();
  const actionData = useActionData();

  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');

  const formErrors = actionData?.formErrors || {};
  const error = actionData?.error || null;

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
        <Box component={RouterForm} method='post' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {success && (
              <Grid item xs={12}>
                <Alert severity='success'>{success}</Alert>
              </Grid>
            )}
            {error && (
              <Grid item xs={12}>
                <Alert severity='error'>{error}</Alert>
              </Grid>
            )}
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                id='email'
                type='email'
                name='email'
                label='Email Address'
                required
                fullWidth
                error={
                  (formErrors?.email && formErrors.email.length !== 0) ||
                  error !== null
                }
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
                error={
                  (formErrors?.password && formErrors.password.length !== 0) ||
                  error !== null
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
