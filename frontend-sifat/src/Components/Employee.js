import React from 'react';
import { Typography } from '@mui/material';

function Employee(props) {
  const {
    name,
    email,
    managerName,
    isOwner,
    isAdmin,
    isActive,
    isPermanent,
    contractStartDate,
    contractEndDate,
  } = props;

  console.log(props);

  return (
    <div className='employee-box'>
      <div className='left-column'>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {email}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Manager: {managerName || 'None'}
        </Typography>
      </div>
      <div className='right-column'>
        <Typography variant='body2'>
          {isOwner ? 'Owner' : isAdmin ? 'Admin' : 'Employee'}
        </Typography>
        <Typography variant='body2'>
          {isActive ? 'Active' : 'Inactive'}
        </Typography>
        <Typography variant='body2'>
          {isPermanent ? 'Permanent' : 'Contractual'}
        </Typography>
        {contractStartDate && (
          <Typography variant='body2'>
            Start Date: {contractStartDate}
          </Typography>
        )}
        {contractEndDate && (
          <Typography variant='body2'>End Date: {contractEndDate}</Typography>
        )}
      </div>
    </div>
  );
}

export default Employee;
