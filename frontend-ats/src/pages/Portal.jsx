import { Outlet, redirect } from 'react-router-dom';
import authProvider from '../authProvider';

export const portalLoader = async ({ request }) => {
  if (!authProvider.isAuthenticated()) {
    let searchParams = new URLSearchParams();
    searchParams.set('error', 'You must log in first.');
    searchParams.set('from', new URL(request.url).pathname);
    // return redirect('/login?' + searchParams.toString());


    return redirect("/login", )
  }
  return null;
};

const Portal = () => {
  return (
    <>
      <div>Portal</div>
      <Outlet />
    </>
  );
};
export default Portal;
