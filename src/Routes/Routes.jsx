import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AddTransaction from "../Pages/AddTransaction";
import MyTransaction from "../Pages/MyTransaction";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        index: true,
        element:<Home/>
      },
      {
        path: '/add-transaction',
        element:<AddTransaction/>
      },
      {
        path: '/my-transaction',
        element:<MyTransaction/>
      },
      {
        path: '/reports',
        element:<Reports/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
  },
]);