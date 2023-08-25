import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import SignUpPage, { action as signUpAction } from './pages/SignUp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<h1>Root Page</h1>} />
      <Route path='/sign-up' element={<SignUpPage />} action={signUpAction} />
      <Route path='/login' element={<h1>Login Page</h1>} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
