import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import CreateCompanyOwner, {
  createCompanyOwnerAction,
} from './pages/CreateCompanyOwner';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<h1>Root Page</h1>} />
      <Route
        path='/create-company-owner'
        element={<CreateCompanyOwner />}
        action={createCompanyOwnerAction}
      />
      <Route path='/login' element={<h1>Login Page</h1>} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
