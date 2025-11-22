import React, { useState } from 'react';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';

export default function Profile() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    hospitalName: 'Aga Khan University Hospital',
    hospitalType: 'Private',
    registrationNumber: 'HOS-2024-001',
    address: '123 Medical Street, City Center',
    contactNumber: '+1-555-0123',
    email: 'admin@agakhan.pk',
    emergencyContact: '+1-555-0124',
    totalBeds: '500',
    totalDoctors: '150',
    departments: 'Cardiology, Orthopedics, Neurology, General Surgery',
    adminName: 'Dr. John Smith',
    adminEmail: 'john@agakhan.pk',
    walletAddress: '',
    privateKey: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    console.log('Updating profile:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col w-full md:ml-64 pt-16 md:pt-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Profile</h1>
          <div className="flex items-center gap-4">
            <NotificationBell />
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl">
            {/* Profile Header */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8 mb-8`}>
              <div className="flex items-center gap-6 pb-6 border-b" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>🏥</span>
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formData.hospitalName}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{formData.hospitalType} Hospital</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hospital Details</h3>

              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Hospital Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hospital name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type (General, Specialized, Private, Govt.)</label>
                    <input
                      type="text"
                      name="hospitalType"
                      value={formData.hospitalType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Registration */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Registration / License number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emergency availability (Yes/No)</label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Total Beds */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available appointment slots / timings</label>
                    <input
                      type="text"
                      name="totalBeds"
                      value={formData.totalBeds}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Total Doctors */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Doctors linked with this hospital</label>
                    <input
                      type="text"
                      name="totalDoctors"
                      value={formData.totalDoctors}
                      onChange={handleInputChange}
                      placeholder="e.g., 150"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Departments */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Departments (Cardiology, Orthopedic, etc.)</label>
                    <textarea
                      name="departments"
                      value={formData.departments}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Blockchain Information */}
              <div className="mt-8 pt-8 border-t" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Blockchain Information</h3>
                <div className="grid grid-cols-2 gap-8">
                  {/* Wallet Address */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wallet Address</label>
                    <input
                      type="text"
                      name="walletAddress"
                      value={formData.walletAddress}
                      onChange={handleInputChange}
                      placeholder="0x..."
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>

                {/* Private Key - Full Width */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Private Key</label>
                  <textarea
                    name="privateKey"
                    value={formData.privateKey}
                    onChange={handleInputChange}
                    placeholder="Enter private key"
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    }`}
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleUpdateProfile}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
