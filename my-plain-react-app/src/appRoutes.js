import { createBrowserRouter, Navigate, Outlet, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import TaskController from "./page/task_list/task.controller.tsx";
import TaskAddController from "./page/task_add/task.controller.tsx";
import TaskEditController from "./page/task_edit/task_Edit.controller.tsx";
import LoginController from "./page/login/login.controller.tsx";
import SignUp from "./page/signUp/signUp.tsx";

function beforeEveryRoute({request}) {

  const isLogin = localStorage.getItem("login") === "true";
  const url = new URL(request.url);
  const currentPath = url.pathname;
  
  if (currentPath !== "/login" && isLogin !== true) {
    throw redirect("/login");
  }else if(currentPath == "/login" && isLogin == true){
    throw redirect("/list");
  }
}
function RootLayout() {
  return <Outlet />; // Renders child routes
}

// ROUTER WITH GLOBAL LOADER
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: beforeEveryRoute,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginController /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "dashboard", element: <h1>Dashboard</h1> },
      { path: "list", element: <TaskController /> },
      { path: "add", element: <TaskAddController /> },
      { path: "edit", element: <TaskEditController /> }
    ],
  },
]);
export default function AppRoutes() {
    return <RouterProvider router={router} />;
}