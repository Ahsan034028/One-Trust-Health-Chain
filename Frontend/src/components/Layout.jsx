// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto ml-64 -mt-16 pt-16">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}