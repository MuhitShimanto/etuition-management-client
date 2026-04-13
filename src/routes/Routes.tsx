import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Tuitions from "../pages/Tuitions";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "tuitions",
        element: <Tuitions/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      }
    ]
  }
]);
export default router;
