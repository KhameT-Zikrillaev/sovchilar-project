import React from 'react';
import RootRoute from '../config/routes';

function MainLayout() {
  return (
    <main className="flex-grow">
      <RootRoute />
    </main>
  );
}

export default MainLayout;
