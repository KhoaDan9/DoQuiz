import { ToastContainer } from "react-toastify";
import React from "react";

import User from "../components/User/User";
import App from "../views/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "../components/Admin/Admin";
import HomePage from "../components/Home/HomePage";
import ManageUser from "../components/Admin/Content/ManageUser";
import Dashboard from "../components/Admin/Content/Dashboard";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/users",
          element: <User />,
        },
      ],
    },
    {
      path: "/admins",
      element: <Admin />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "manage-users",
          element: <ManageUser />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />,
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
