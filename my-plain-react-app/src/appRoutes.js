import { createBrowserRouter, Navigate, Outlet, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import TaskController from "./page/task_list/task.controller.tsx";
import TaskAddController from "./page/task_add/task.controller.tsx";
import TaskEditController from "./page/task_edit/task_Edit.controller.tsx";
import LoginController from "./page/login/login.controller.tsx";
import SignUp from "./page/signUp/signUp.tsx";

import { initializeApp } from "firebase/app";

function beforeEveryRoute({request}) {
  
  // Firebase Code
  const firebaseConfig = {
    apiKey: "AIzaSyAlJp7T1WORyAy5aXT2GPrC6_mmoEYM9FM",
    authDomain: "testproject-29811.firebaseapp.com",
    projectId: "testproject-29811",
    storageBucket: "testproject-29811.firebasestorage.app",
    messagingSenderId: "215065405551",
    appId: "1:215065405551:web:da2c959aae16ab2e20859a",
    measurementId: "G-G36CPLW3QM"
  };
  const app = initializeApp(firebaseConfig);
  console.log("Firebase Connected ✅");

  // 1. read existing guest id
  const match = document.cookie.match(/id=([^;]+)/);
  let guestId = match?.[1];

  const url = new URL(request.url);
  const currentPath = url.pathname;
  
  if (currentPath !== "/login" && !guestId) {
    throw redirect("/login");
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