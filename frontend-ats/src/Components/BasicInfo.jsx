import React from 'react';
import ReactDOM from 'react-dom/client';

import Navbar from './Navbar';
import Company from './Company';

function BasicInfo() {
  return (
    <div>
      <h1>Basic Informations</h1>
      <Company />
    </div>
  );
}

export default BasicInfo;
