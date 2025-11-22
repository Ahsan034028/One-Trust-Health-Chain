// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto ml-64 -mt-16 pt-16">
=======
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
>>>>>>> 4cb16abe25d827d6ac352ee8fe29b5c2d6076638
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}