import React, { useState } from 'react';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import NotificationBell from '../PatientPortal/NotificationBell';
import { useDarkMode } from '../context/DarkModeContext';

export default function AddDoctor() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    qualifications: '',
    licenseNumber: '',
    yearsOfExperience: '',
    consultationFee: '',
    availableFrom: '',
    availableTo: '',
    walletAddress: '',
    privateKey: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError('');
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First Name and Last Name are required');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    if (!formData.specialization.trim()) {
      setError('Specialization is required');
      return false;
    }
    
    if (!formData.licenseNumber.trim()) {
      setError('License Number is required');
      return false;
    }
    
    if (!formData.yearsOfExperience.trim()) {
      setError('Years of Experience is required');
      return false;
    }
    
    if (!formData.walletAddress.trim() || !formData.privateKey.trim() || !formData.password.trim()) {
      setError('Wallet Address, Private Key, and Password are required');
      return false;
    }
    
    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      setError('Wallet Address must be a valid Ethereum address (0x...)');
      return false;
    }
    
    if (formData.privateKey.length < 10) {
      setError('Private Key must be at least 10 characters');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Adding Doctor:', formData);
      setSuccess('Doctor added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: '',
        qualifications: '',
        licenseNumber: '',
        yearsOfExperience: '',
        consultationFee: '',
        availableFrom: '',
        availableTo: '',
        walletAddress: '',
        privateKey: '',
        password: '',
      });
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Add Doctor</h1>
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
            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'}`}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>
                {success}
              </div>
            )}

            {/* Form */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8`}>
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {/* First Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="doctor@example.com"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Professional Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {/* Specialization */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Specialization *</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="e.g., Cardiology"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* License Number */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>License Number *</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Enter license number"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Qualifications */}
                  <div className="col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Qualifications</label>
                    <textarea
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      placeholder="e.g., MBBS, MD"
                      rows="2"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Years of Experience *</label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      placeholder="Enter years"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Consultation Fee</label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      placeholder="Enter fee amount"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Available From */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available From</label>
                    <input
                      type="time"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>

                  {/* Available To */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available To</label>
                    <input
                      type="time"
                      name="availableTo"
                      value={formData.availableTo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>

                {/* Blockchain Information */}
                <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Blockchain Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {/* Wallet Address */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wallet Address *</label>
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
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password *</label>
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

                  {/* Private Key */}
                  <div className="col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Private Key *</label>
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

                {/* Submit Button */}
                <div className="flex gap-4 pt-6 border-t" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                  <button
                    type="submit"
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Add Doctor
                  </button>
                  <button
                    type="button"
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
