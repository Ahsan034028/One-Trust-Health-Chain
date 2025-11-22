import React from 'react';
import {
  Bars3Icon,
  PlusIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import blueLogo from '../assets/Bluelogo.png';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Bars3Icon, path: '/hospital' },
  { id: 'add', label: 'Add Doctor', icon: PlusIcon, path: '/hospital/add-doctor' },
  { id: 'manage', label: 'Manage Hospitals', icon: BuildingLibraryIcon, path: '/hospital/manage' },
  { id: 'analytics', label: 'Analytics', icon: ChartBarIcon, path: '/hospital/analytics' },
  { id: 'help', label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/hospital/help' },
  { id: 'profile', label: 'Profile', icon: UserCircleIcon, path: '/hospital/profile' },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, path: '/hospital/settings' },
];

export default function HospitalSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const currentPath = location.pathname;

  const handleLogout = () => {
    navigate('/hospital-login');
  };

  return (
    <div className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r h-screen flex flex-col fixed top-0 left-0 transition-colors`}>
      {/* Logo */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <img src={blueLogo} alt="Logo" className="w-40" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
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
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
