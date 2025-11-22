// src/components/Sidebar.jsx
import React from 'react';
import { 
  Bars3Icon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  QuestionMarkCircleIcon, 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import blueLogo from '../assets/Bluelogo.png';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Bars3Icon, path: '/doctor' },
  { id: 'add', label: 'Add Patient', icon: PlusIcon, path: '/doctor/add-patient' },
  { id: 'upload', label: 'Upload Reports', icon: DocumentTextIcon, path: '/doctor/upload' },
  { id: 'records', label: 'Health records', icon: DocumentTextIcon, path: '/doctor/records' },
  { id: 'analytics', label: 'Analytics', icon: ChartBarIcon, path: '/doctor/analytics' },
  { id: 'help', label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/doctor/help' },
  { id: 'profile', label: 'Profile', icon: UserCircleIcon, path: '/doctor/profile' },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, path: '/doctor/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const currentPath = location.pathname;

  const handleLogout = () => {
    navigate('/doctor-login');
  };

  return (
    <div className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r h-screen flex flex-col fixed top-0 left-0 transition-colors overflow-hidden`}>
      {/* Logo */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
        <img src={blueLogo} alt="Logo" className="w-40" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
        <button 
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
          darkMode
          ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}