import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AddTransaction from "../Pages/AddTransaction";
import MyTransaction from "../Pages/MyTransaction";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Components/ErrorPage";
import PrivetRoutes from "./PrivetRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-transaction",
        element: (
          <PrivetRoutes>
            <AddTransaction />
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-transaction",
        element: (
          <PrivetRoutes>
            <MyTransaction />
          </PrivetRoutes>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivetRoutes>
            <Reports />
          </PrivetRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
