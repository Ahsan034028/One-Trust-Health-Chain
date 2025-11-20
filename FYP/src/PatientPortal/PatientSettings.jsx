import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, BellIcon, LockClosedIcon, GlobeAltIcon, ShieldCheckIcon, ArrowUpTrayIcon, QuestionMarkCircleIcon, ArrowUpRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import PatientSidebar from './PatientSidebar';
import { useDarkMode } from '../context/DarkModeContext';

export default function PatientSettings() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [expandedSection, setExpandedSection] = useState('notification');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    reportNotifications: false,
    language: 'English',
    timezone: 'UTC',
    dataBackup: true,
    twoFactor: false,
  });

  const handleToggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderIcon = (iconType) => {
    const iconProps = "w-5 h-5";
    switch(iconType) {
      case 'notification':
        return <BellIcon className={iconProps} />;
      case 'access':
        return <LockClosedIcon className={iconProps} />;
      case 'language':
        return <GlobeAltIcon className={iconProps} />;
      case 'privacy':
        return <ShieldCheckIcon className={iconProps} />;
      case 'backup':
        return <ArrowUpTrayIcon className={iconProps} />;
      case 'support':
        return <QuestionMarkCircleIcon className={iconProps} />;
      case 'logout':
        return <ArrowUpRightIcon className={iconProps} />;
      default:
        return null;
    }
  };

  const settingsSections = [
    { id: 'notification', label: 'Notification' },
    { id: 'access', label: 'Access and permission' },
    { id: 'language', label: 'Language settings' },
    { id: 'privacy', label: 'Data and privacy' },
    { id: 'backup', label: 'Backup and recovery option' },
    { id: 'support', label: 'Help and support' },
    { id: 'logout', label: 'Log out' },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <PatientSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex ml-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* SETTINGS MENU */}
        <div className={`w-80 border-r ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex flex-col`}>
          <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-6`}>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Settings</h1>
          </div>

          {/* Search */}
          <div className="px-6 py-4">
            <input
              type="text"
              placeholder="Search setting"
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
              }`}
            />
          </div>

          {/* Settings Menu Items */}
          <div className="flex-1 overflow-y-auto px-3">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setExpandedSection(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                  expandedSection === section.id
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${expandedSection === section.id ? 'text-white' : darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {renderIcon(section.id)}
                  </div>
                  <span>{section.label}</span>
                </div>
                <ChevronRightIcon className={`w-4 h-4 transition-transform ${expandedSection === section.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* SETTINGS CONTENT */}
        <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

          {/* SETTINGS CONTENT */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl">
              {expandedSection === 'notification' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Notification</h2>
                  <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select the notifications you prefer to receive and those you would rather avoid.</p>

                  <div className="space-y-6">
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Filter</p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select the notifications you prefer to receive and those you would rather avoid.</p>
                        </div>
                        <button
                          onClick={() => handleToggleSetting('emailNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Preference</p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your notification preferences based on the type of notification you prefer.</p>
                        </div>
                        <button
                          onClick={() => handleToggleSetting('smsNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {expandedSection === 'access' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Access and Permission</h2>

                  <div className="space-y-6">
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                        <button
                          onClick={() => handleToggleSetting('twoFactor')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            settings.twoFactor ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.twoFactor ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {expandedSection === 'language' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Language Settings</h2>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preferred Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSelectChange('language', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                        }`}
                      >
                        <option value="English">English</option>
                        <option value="Urdu">Urdu</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSelectChange('timezone', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                        }`}
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">EST</option>
                        <option value="CST">CST</option>
                        <option value="PST">PST</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {expandedSection === 'privacy' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Data and Privacy</h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your data is encrypted and secure. Review our privacy policy for more details.</p>
                </div>
              )}

              {expandedSection === 'backup' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Backup and Recovery</h2>

                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Automatic Backup</p>
                        <button
                          onClick={() => handleToggleSetting('dataBackup')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            settings.dataBackup ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.dataBackup ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last backup: 2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}

              {expandedSection === 'support' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Help and Support</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>📧 Email Support</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ahsanali034028@gmail.com</p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>📞 Phone Support</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+923462851289</p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>💬 Live Chat</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Available 24/7</p>
                      <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        darkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        Start Chat
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {expandedSection === 'logout' && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Log Out</h2>
                  <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Are you sure you want to log out?</p>
                  <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
