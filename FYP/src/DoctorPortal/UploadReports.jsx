import React, { useState } from 'react';
import { XMarkIcon, DocumentTextIcon, BellIcon, ChevronDownIcon, Squares2X2Icon, DocumentArrowUpIcon, ChartBarIcon, QuestionMarkCircleIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import blueLogo from '../assets/Bluelogo.png';

export default function UploadReports() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [files, setFiles] = useState([
    { id: 1, name: 'MRI Report', size: '100KB' },
    { id: 2, name: 'Diagnostic Report', size: '100KB' },
  ]);

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const menuItems = [
    { label: 'Dashboard', icon: Squares2X2Icon, path: '/doctor' },
    { label: 'Upload Reports', icon: DocumentArrowUpIcon, path: '/doctor/upload' },
    { label: 'Health records', icon: DocumentTextIcon, path: '/doctor/records' },
    { label: 'Analytics', icon: ChartBarIcon, path: '/doctor/analytics' },
    { label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/doctor/help' },
    { label: 'Profile', icon: UserCircleIcon, path: '/doctor/profile' },
    { label: 'Settings', icon: Cog6ToothIcon, path: '/doctor/settings' },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r p-6 flex flex-col gap-8`}>
        {/* Logo */}
        <div className="flex items-center">
          <img src={blueLogo} alt="One Trust Healthchain" className="w-40 h-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                item.label === 'Upload Reports'
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button 
          onClick={() => navigate('/doctor-login')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Upload Reports</h1>
          <div className="flex items-center gap-4">
            <button className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <BellIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => toggleDarkMode()}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl">
            {/* Modal Card */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8 transition-colors`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Media Upload</h2>
                <button className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Add your documents here, and you can upload up to 5 files max</p>

              {/* Drag & Drop Area */}
              <div className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-colors ${
                darkMode 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-blue-400 bg-blue-50'
              }`}>
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${
                    darkMode ? 'bg-blue-900' : 'bg-blue-100'
                  }`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <p className={`font-medium mb-1 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Drag your file(s) to start uploading</p>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</p>
                <button className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  darkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Browse files
                </button>
              </div>

              {/* File Info */}
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-6`}>Only support .jpg, .png and .svg and .zip files</p>

              {/* Files List */}
              <div className="space-y-3 mb-8">
                {files.map((file) => (
                  <div key={file.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                        darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
                      }`}>
                        <DocumentTextIcon className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{file.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className={`p-1 transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Cancel
                </button>
                <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
