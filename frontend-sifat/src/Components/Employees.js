import React from 'react';
import ReactDOM from 'react-dom/client';

import Navbar from './Navbar';
import EmployeeList from './EmployeeList';

import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Employees() {
  return (
    <div>
      <Navbar />
      <Button color='inherit' component={Link} to='/permanent-employees'>
        Permanent Employees
      </Button>
      <Button color='inherit' component={Link} to='/contract-employees'>
        Contractual Employees
      </Button>
      <EmployeeList />
    </div>
  );
}

export default Employees;
