import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import UserDetails from "../../pages/DetailesPages";
import NotFound from "../../pages/NotFound";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import UpdatePassword from "../../pages/updatePassword/UpdatePassword";
import Profile from "../../pages/profile/Profile";
import Favourite from "../../pages/favourite/Favourite";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user/:id",
    element: <UserDetails />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  // {
  //   path: "/favourite",
  //   element: <Favourite />,
  // },
];

function RootRoute() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {/* Маршрут для 404 ошибки */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoute;
