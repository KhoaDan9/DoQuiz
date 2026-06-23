import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

import App from "../views/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "../components/Admin/Admin";
import HomePage from "../components/Home/HomePage";
import ManageUser from "../components/Admin/Content/ManageUser";
import ManageQuiz from "../components/Admin/Content/Quiz/ManageQuiz";
import Dashboard from "../components/Admin/Content/Dashboard";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ListQuiz from "../components/User/ListQuiz";
import DetailQuiz from "../components/User/DetailQuiz";
import Questions from "../components/Admin/Content/Question/Questions";
import PrivateRoute from "../routes/PrivateRoute";
import Profile from "../components/User/Profile";

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
          path: "/quizzes",
          element: (
            <PrivateRoute>
              <ListQuiz />
            </PrivateRoute>
          ),
        },
        {
          path: "/quizzes/:id",
          element: (
            <PrivateRoute>
              <DetailQuiz />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/admins",
      element: (
        <PrivateRoute>
          <Admin />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "manage-users",
          element: <ManageUser />,
        },
        {
          path: "manage-quizzes",
          element: <ManageQuiz />,
        },
        {
          path: "manage-questions",
          element: <Questions />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <Suspense fallback="...is loading">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggablepauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
