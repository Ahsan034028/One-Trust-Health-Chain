// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const pageTitles = {
  '/': 'Dashboard',
  '/upload': 'Upload Reports',
  '/records': 'Health records',
  '/analytics': 'Analytics',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="ml-64 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-4">
        <NotificationDropdown />
        <div className="flex items-center gap-3">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">Nadiya Yaqoob</p>
            <p className="text-xs text-gray-500">nadiya@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}