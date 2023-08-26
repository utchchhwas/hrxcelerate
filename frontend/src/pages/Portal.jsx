import { Outlet } from 'react-router-dom';

const Portal = () => {
  return (
    <>
      <div>Portal</div>
      <Outlet />
    </>
  );
};
export default Portal;
