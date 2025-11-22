import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function HospitalSignupModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    walletAddress: '',
    email: '',
    phone: '',
    registrationId: '',
    password: '',
    privateKey: '',
    logo: null,
    address: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const requiredFields = ['name', 'walletAddress', 'email', 'phone', 'registrationId', 'password', 'privateKey'];

  const validateForm = () => {
    setError('');
    
    // Check required fields
    for (let field of requiredFields) {
      if (!formData[field] || !formData[field].toString().trim()) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }

    // Validate phone
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    // Validate private key format (basic check)
    if (formData.privateKey.length < 10) {
      setError('Private key must be at least 10 characters');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData(prev => ({
        ...prev,
        logo: files ? files[0] : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulate successful signup
    console.log('Hospital Signup Data:', formData);
    setSuccess('Hospital registered successfully!');
    
    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        walletAddress: '',
        email: '',
        phone: '',
        registrationId: '',
        password: '',
        privateKey: '',
        logo: null,
        address: '',
        city: ''
      });
      setSuccess('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-red-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Hospital Sign Up</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-700 p-1 rounded transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Required Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Hospital Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hospital@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Registration ID *
              </label>
              <input
                type="text"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                placeholder="Enter registration ID"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Wallet Address *
              </label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Private Key *
              </label>
              <textarea
                name="privateKey"
                value={formData.privateKey}
                onChange={handleChange}
                placeholder="Enter private key"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            {/* Optional Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Logo (Optional)
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City (Optional)
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address (Optional)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter hospital address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition text-sm"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-400 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
