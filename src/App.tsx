import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GroupManagement from 'components/GroupManangement';
import ProfileManagement from 'components/ProfileManagement';
import NewPassword from 'containers/NewPassword';
import ResetPassword from 'containers/ResetPassword';
import Login from 'containers/Login';
import LayoutRoot from 'components/LayoutRoot';
import CreateNewAccount from 'containers/CreateNewAccount';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "create-new-account",
        element: <CreateNewAccount />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        path: "auth/new-password/:token",
        element: <NewPassword/>
      },
      {
        path: "profile-management",
        element: <ProfileManagement />
      },
      {
        path: "Group-management",
        element: <GroupManagement />
      }
    ]
  },

])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

