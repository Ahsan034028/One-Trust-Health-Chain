import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon, Squares2X2Icon, DocumentArrowUpIcon, DocumentTextIcon, ChartBarIcon, QuestionMarkCircleIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import blueLogo from '../assets/Bluelogo.png';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('Notification preference');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [enabledNotifications, setEnabledNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    appointment: true,
  });

  const menuItems = [
    { label: 'Dashboard', icon: Squares2X2Icon, path: '/doctor' },
    { label: 'Upload Reports', icon: DocumentArrowUpIcon, path: '/doctor/upload' },
    { label: 'Health records', icon: DocumentTextIcon, path: '/doctor/records' },
    { label: 'Analytics', icon: ChartBarIcon, path: '/doctor/analytics' },
    { label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/doctor/help' },
    { label: 'Profile', icon: UserCircleIcon, path: '/doctor/profile' },
    { label: 'Settings', icon: Cog6ToothIcon, path: '/doctor/settings' },
  ];

  const settingsOptions = [
    { label: 'Access and permission', category: 'Account' },
    { label: 'Language settings', category: 'Account' },
    { label: 'Notification preference', category: 'Account' },
    { label: 'Data and privacy', category: 'Data' },
    { label: 'Backup and recovery option', category: 'Data' },
    { label: 'Help and support', category: 'Support' },
    { label: 'Log out', category: 'Account' },
  ];

  const notificationOptions = [
    { label: 'Email notifications for new patients', defaultChecked: true },
    { label: 'Push notifications for urgent cases', defaultChecked: true },
    { label: 'Weekly summary reports', defaultChecked: false },
    { label: 'Appointment reminders', defaultChecked: true },
  ];

  const filteredSettings = settingsOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderModal = () => {
    if (!showModal) return null;

    const isConfirmLogout = modalContent.type === 'confirm-logout';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full mx-4 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {modalContent.title}
            </h3>
            <button onClick={() => setShowModal(false)} className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {modalContent.message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(false)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            {isConfirmLogout ? (
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/');
                }}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'Access and permission':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Access and Permission
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage who can access your account and what permissions they have.
            </p>
            <div className="space-y-4">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Active Sessions
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current Device - Windows Browser
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Sign Out Other Sessions',
                      message: 'All other active sessions will be signed out. You will remain signed in on this device.',
                      type: 'confirm'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  Sign Out Other Sessions
                </button>
              </div>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Two-Factor Authentication
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Add an extra layer of security to your account
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Enable 2FA',
                      message: 'Two-Factor Authentication has been enabled successfully. Use your authenticator app to verify logins.',
                      type: 'success'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Language settings':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Language Settings
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select your preferred language for the application.
            </p>
            <div className="space-y-3">
              {['English', 'Spanish', 'French', 'German', 'Arabic', 'Chinese'].map((lang, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-opacity-50 transition">
                  <input 
                    type="radio" 
                    name="language"
                    defaultChecked={lang === 'English'}
                    onChange={() => {
                      setModalContent({
                        title: 'Language Changed',
                        message: `Language changed to ${lang} successfully.`,
                        type: 'success'
                      });
                      setShowModal(true);
                    }}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {lang}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'Notification preference':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Notification
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select the notifications you prefer to receive and those you would rather avoid.
            </p>

            {/* Filter Option */}
            <div 
              onClick={() => {
                setModalContent({
                  title: 'Filter Notifications',
                  message: 'Customize which notification types you want to receive based on urgency and category.',
                  type: 'info'
                });
                setShowModal(true);
              }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg mb-8 cursor-pointer hover:opacity-80 transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Filter
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select the notifications you prefer to receive and those you would rather avoid.
                  </p>
                </div>
                <ChevronRightIcon className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
            </div>

            {/* Preference Option */}
            <div 
              onClick={() => {
                setModalContent({
                  title: 'Notification Preferences',
                  message: 'Set your preferred notification channels: Email, Push, SMS, or In-app notifications.',
                  type: 'info'
                });
                setShowModal(true);
              }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg mb-8 cursor-pointer hover:opacity-80 transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Preference
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose your notification preferences based on the type of notification you prefer.
                  </p>
                </div>
                <ChevronRightIcon className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
            </div>

            {/* Notification Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-opacity-50 transition">
                <input 
                  type="checkbox" 
                  checked={enabledNotifications.email}
                  onChange={(e) => setEnabledNotifications({...enabledNotifications, email: e.target.checked})}
                  className="w-5 h-5 rounded accent-blue-600"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Email notifications for new patients
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-opacity-50 transition">
                <input 
                  type="checkbox" 
                  checked={enabledNotifications.push}
                  onChange={(e) => setEnabledNotifications({...enabledNotifications, push: e.target.checked})}
                  className="w-5 h-5 rounded accent-blue-600"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Push notifications for urgent cases
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-opacity-50 transition">
                <input 
                  type="checkbox" 
                  checked={enabledNotifications.weekly}
                  onChange={(e) => setEnabledNotifications({...enabledNotifications, weekly: e.target.checked})}
                  className="w-5 h-5 rounded accent-blue-600"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Weekly summary reports
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-opacity-50 transition">
                <input 
                  type="checkbox" 
                  checked={enabledNotifications.appointment}
                  onChange={(e) => setEnabledNotifications({...enabledNotifications, appointment: e.target.checked})}
                  className="w-5 h-5 rounded accent-blue-600"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Appointment reminders
                </span>
              </label>
            </div>
          </div>
        );
      
      case 'Data and privacy':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Data and Privacy
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your data privacy and what information is shared.
            </p>
            <div className="space-y-4">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Data Collection
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Allow us to collect usage analytics to improve the application
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    onChange={() => {
                      setModalContent({
                        title: 'Analytics Setting Updated',
                        message: 'Your data collection preference has been saved.',
                        type: 'success'
                      });
                      setShowModal(true);
                    }}
                    className="w-5 h-5 rounded accent-blue-600" 
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Enable Analytics</span>
                </label>
              </div>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Download Your Data
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Download all your personal data in a portable format
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Data Download Started',
                      message: 'Your data export has started. You will receive an email with a download link shortly.',
                      type: 'success'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Download Data
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Backup and recovery option':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Backup and Recovery
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create backups and recover your account if needed.
            </p>
            <div className="space-y-4">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Automatic Backup
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last backup: Today at 2:30 PM
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Backup Started',
                      message: 'Your account data is being backed up. This may take a few minutes.',
                      type: 'success'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Backup Now
                </button>
              </div>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Recovery Options
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Set up recovery methods to secure your account
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Recovery Options',
                      message: 'Add recovery methods like email address and phone number to help regain access to your account if needed.',
                      type: 'info'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Configure Recovery
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Help and support':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Help and Support
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get help with common issues and contact our support team.
            </p>
            <div className="space-y-4">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  FAQ
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Find answers to frequently asked questions
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'FAQ',
                      message: 'Opening Frequently Asked Questions page...',
                      type: 'info'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  View FAQ
                </button>
              </div>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Contact Support
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email: support@onetrust.com | Phone: +1 (800) 123-4567
                </p>
                <button 
                  onClick={() => {
                    setModalContent({
                      title: 'Support Ticket',
                      message: 'Opening support form. Please describe your issue and we will assist you shortly.',
                      type: 'info'
                    });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Send Support Ticket
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Log out':
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Log Out
            </h2>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign out from your account.
            </p>
            <div className={`${darkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-6`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                Sign Out
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                You will be signed out from this account. You can sign in again anytime.
              </p>
              <button 
                onClick={() => {
                  setModalContent({
                    title: 'Confirm Sign Out',
                    message: 'Are you sure you want to sign out? You can always sign back in later.',
                    type: 'confirm-logout'
                  });
                  setShowModal(true);
                }}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

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
                item.label === 'Settings'
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
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Settings</h1>
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
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Settings Menu */}
            <div className="col-span-1">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm sticky top-8`}>
                {/* Search Box */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search setting"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <svg className={`absolute right-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Settings List */}
                <div className="space-y-2">
                  {filteredSettings.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSection(option.label)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition text-sm font-medium ${
                        option.label === activeSection
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-700'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Content Area */}
            <div className="col-span-2">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-sm`}>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {renderModal()}
    </div>
  );
}
