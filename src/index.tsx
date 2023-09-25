import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LayoutRoot from 'components/LayoutRoot';
import Login from 'components/Login';
import CreateNewAccount from 'containers/CreateNewAccount';
import ResetPassword from 'components/ResetPassword';
import ProfileManagement from 'components/ProfileManagement';
import GroupManagement from 'components/GroupManagement';

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

// /contact

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();