import React from 'react';
import ReactDOM from 'react-dom/client';

import Navbar from './Navbar';
import EmployeeList from './ContractEmployeeList';

function Employees() {
  return (
    <div>
      <Navbar />
      <EmployeeList />
    </div>
  );
}

export default Employees;
