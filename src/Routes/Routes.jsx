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
import Profile from "../Pages/Profile";
import OverView from "../Pages/OverView";
import TransactionDetails from "../Pages/TransactionDetails";
import UpdateTransaction from "../Pages/UpdateTransaction";
import UpdateProfile from "../Pages/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/transactions"),
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
        loader: () => fetch("http://localhost:3000/transactions"),
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
      {
        path: "/profile",
        element: (
          <div className="flex justify-center items-center">
            <Profile />
          </div>
        ),
      },
      {
        path: "/transaction-details/:id",
        element: (
          <PrivetRoutes>
            <TransactionDetails />
          </PrivetRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/transactions/${params.id}`),
      },
      {
        path: "/update-transacion/:id",
        element: (
          <PrivetRoutes>
            <UpdateTransaction />
          </PrivetRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/transactions/${params.id}`),
      },
      {
        path: "/update-profile",
        element: (
          <PrivetRoutes>
            <UpdateProfile />
          </PrivetRoutes>
        ),
      },
    ],
  },
]);
