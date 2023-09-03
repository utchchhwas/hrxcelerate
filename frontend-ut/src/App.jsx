import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import RootPage from './pages/RootPage';
import CreateCompanyOwner, {
  createCompanyOwnerAction,
} from './pages/CreateCompanyOwner';
import Login, { loginAction, loginLoader } from './pages/Login';
import Portal, { portalLoader } from './pages/Portal';
import CompanyInfo from './pages/CompanyInfo';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootPage />} />
      <Route
        path='/create-company-owner'
        element={<CreateCompanyOwner />}
        action={createCompanyOwnerAction}
      />
      <Route
        path='/login'
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path='/portal' element={<Portal />} loader={portalLoader}>
        <Route path='company-info' element={<CompanyInfo />}></Route>
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
