import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <h1>Root Page</h1>,
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/homepage',
        element: <h1>Homepage</h1>,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<AppFallback />} />;
}

const AppFallback = () => {
  return <h1>App is Loading...</h1>;
};
