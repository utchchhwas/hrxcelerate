import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import CreateCompanyOwner, {
  createCompanyOwnerAction,
} from './pages/CreateCompanyOwner';
import Login, { loginAction } from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<h1>Root Page</h1>} />
      <Route
        path='/create-company-owner'
        element={<CreateCompanyOwner />}
        action={createCompanyOwnerAction}
      />
      <Route path='/login' element={<Login />} action={loginAction} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
