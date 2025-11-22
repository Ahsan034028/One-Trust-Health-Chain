import React, { useState } from 'react';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';

export default function AddHospital() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    hospitalName: '',
    logo: null,
    type: '',
    address: '',
    contact: '',
    registrationNumber: '',
    ownerDetails: '',
    verificationDocs: null,
    departments: '',
    emergencyAvailability: false,
    hospitalAdmin: '',
    doctorsLinked: '',
    appointmentSlots: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleAddHospital = () => {
    console.log('Adding hospital:', formData);
    alert('Hospital added successfully!');
    setFormData({
      hospitalName: '',
      logo: null,
      type: '',
      address: '',
      contact: '',
      registrationNumber: '',
      ownerDetails: '',
      verificationDocs: null,
      departments: '',
      emergencyAvailability: false,
      hospitalAdmin: '',
      doctorsLinked: '',
      appointmentSlots: '',
    });
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col w-full md:ml-64 pt-16 md:pt-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Add Hospital</h1>
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
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
              <h2 className={`text-lg font-semibold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hospital Information</h2>

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
                      placeholder="Enter hospital name"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Logo</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Upload
                    </button>
                  </div>

                  {/* Type */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type (General, Specialized, Private, Govt.)</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    >
                      <option value="">Select type</option>
                      <option value="General">General</option>
                      <option value="Specialized">Specialized</option>
                      <option value="Private">Private</option>
                      <option value="Govt">Government</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Add
                    </button>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Add
                    </button>
                  </div>

                  {/* Registration Number */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Registration / License number</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Add
                    </button>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Emergency Availability */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emergency availability (Yes/No)</label>
                    <select
                      name="emergencyAvailability"
                      value={formData.emergencyAvailability}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  {/* Hospital Admin Account */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hospital admin account</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Add
                    </button>
                  </div>

                  {/* Doctors Linked */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Doctors linked with this hospital</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Select
                    </button>
                  </div>

                  {/* Available Appointment Slots */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available appointment slots / timings</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Update
                    </button>
                  </div>

                  {/* Verification Documents */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verification documents</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Upload
                    </button>
                  </div>

                  {/* Departments */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Departments (Cardiology, Orthopedic, etc.)</label>
                    <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Hospital Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleAddHospital}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Add Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
