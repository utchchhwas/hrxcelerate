import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Components/Login';
import Departments from './Components/Departments';
import BasicInfo from './Components/BasicInfo';
import Employee from './Components/Employee';

const App = () => {
  return (
    // <Login />
    // <Departments />
    // <BasicInfo />
    <Employee />
  );
};

export default App;
