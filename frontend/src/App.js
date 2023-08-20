import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import SignInComponent from './Components/SignInComponent';

const App = () => {
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <SignInComponent />
    </AuthProvider>
  );
};

export default App;
