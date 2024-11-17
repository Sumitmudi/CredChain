import Home from "./pages/home/home";
import Role from "./pages/roles/role";
import Student from "./pages/student/student";
import Employer from "./pages/employer/employer";
import Institute from "./pages/institution/institute";
import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//createing a browser router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/roles",
    element: <Role />,
  },
  {
    path: "/roles/student",
    element: <Student />,
  },
  {
    path: "/roles/institute",
    element: <Institute />,
  },
  {
    path: "/roles/employer",
    element: <Employer />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
