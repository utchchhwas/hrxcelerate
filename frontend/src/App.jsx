import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import CreateCompanyOwner, {
  createCompanyOwnerAction,
} from './pages/CreateCompanyOwner';
import Login, { loginAction } from './pages/Login';
import RootPage from './pages/RootPage';
import Portal from './pages/Portal';
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
      <Route path='/login' element={<Login />} action={loginAction} />
      <Route path='/portal' element={<Portal />}>
        <Route path='company-info' element={<CompanyInfo />}></Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <AuthProvider authName={'_auth'} authType={'cookie'}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
