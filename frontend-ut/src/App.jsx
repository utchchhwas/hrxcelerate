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

import Navbar from './Components/Navbar';
import Departments from './Components/Departments';
import AddDepartment from './Components/AddDepartment';
import Employee from './Components/Employees';
import AddEmployee from './Components/AddEmployee';
import BasicInfo from './Components/BasicInfo';
import JobRoles from './Components/JobRoles';
import AddJobRole from './Components/AddJobRole';
import JobPostings from './Components/JobPostings';
import Applicants from './Components/Applicants';

import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
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
      <Route path='/job-postings' element={<h1>Job Postings</h1>} />
      <Route path='/portal' element={<Navbar />} loader={portalLoader}>
        <Route path='home' element={<BasicInfo />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
