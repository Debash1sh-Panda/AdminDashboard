import React from "react";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {Toaster} from 'react-hot-toast'
import UserProfile from "./components/Home/UserProfile";
import Settings from "./components/Home/Settings";
import AdminHome from "./components/adminsection/AdminHome";
import AdminGraph from "./components/adminsection/AdminGraph";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },

  //admin
  {
    path: "/admin/home",
    element: <AdminHome />,
  },
  {
    path: "/admin/graph",
    element: <AdminGraph />,
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </>
  );
}

export default App;
