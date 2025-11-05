import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import TaskList from "./page/task_list/task_list.tsx";
import TaskAdd from "./page/task_add/task_add.tsx";
import Login from "./page/login/login.tsx";
import LoginController from "./page/login/login.controller.tsx";
import SignUp from "./page/signUp/signUp.tsx";


const router = createBrowserRouter([
    {
      path: "/",
      element:  <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <LoginController/>,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <h1>Dashboard</h1>,
    },
    {
      path: "/list",
      element: <TaskList/>,
    },
    {
      path: "/add",
      element: <TaskAdd/>,
    },
    
]);
export default function AppRoutes() {
  
    return <RouterProvider router={router} />;
}