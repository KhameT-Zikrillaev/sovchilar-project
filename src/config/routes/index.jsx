import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home';
import Auth from '../../pages/auth';
import UserDetails from '../../pages/DetailesPages';
import NotFound from '../../pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/user/:id',
    element: <UserDetails />
  }
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
