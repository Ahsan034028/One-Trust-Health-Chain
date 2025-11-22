import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/Background.jpg';
import logo from '../assets/signuplogo.png';

export default function HospitalSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    walletAddress: '',
    email: '',
    phone: '',
    registrationId: '',
    password: '',
    privateKey: '',
    logo: null,
    city: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  const requiredFields = ['name', 'walletAddress', 'email', 'phone', 'registrationId', 'password', 'privateKey'];

  const validateForm = () => {
    setError('');
    for (let field of requiredFields) {
      if (!formData[field] || !formData[field].toString().trim()) {
        setError(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
        return false;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }

    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.privateKey.length < 10) {
      setError('Private key must be at least 10 characters');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData((prev) => ({ ...prev, logo: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Hospital Signup Data:', formData);
    setSuccess('Hospital registered successfully! Redirecting to login...');
    setTimeout(() => navigate('/hospital-login'), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Header Navigation - matching main screens */}
      <div className="px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div className="w-12 md:w-20"></div>
        <div className="flex gap-4 md:gap-12 flex-wrap justify-center">
          <button onClick={() => handleNavigation('/welcome')} className="text-white font-bold text-xs md:text-base hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95">WELCOME</button>
          <button onClick={() => handleNavigation('/patient-login')} className="text-white font-bold text-xs md:text-base hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95">PATIENT</button>
          <button onClick={() => handleNavigation('/doctor-login')} className="text-white font-bold text-xs md:text-base hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95">DOCTOR</button>
          <button onClick={() => handleNavigation('/hospital-login')} className="text-white font-bold text-xs md:text-base hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95">HOSPITAL</button>
        </div>
        <div className="w-12 md:w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full px-4 md:px-6 py-4">
        <div className="text-center mb-4 md:mb-6">
          <img src={logo} alt="One Trust Healthchain Logo" className="h-12 md:h-16 w-auto object-contain mx-auto mb-2 md:mb-4" />
        </div>

        {error && (
          <div className="mb-3 p-2 rounded text-xs bg-red-100 text-red-700 max-w-7xl mx-auto">{error}</div>
        )}
        {success && (
          <div className="mb-3 p-2 rounded text-xs bg-green-100 text-green-700 max-w-7xl mx-auto">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-none w-full">
          <div className="px-0 max-w-7xl mx-auto w-full lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Hospital Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter hospital name" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hospital@example.com" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Registration ID *</label>
              <input type="text" name="registrationId" value={formData.registrationId} onChange={handleChange} placeholder="Enter registration ID" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Wallet Address *</label>
              <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleChange} placeholder="0x..." className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Password *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div className="lg:col-span-4">
              <label className="block text-sm font-semibold text-white mb-1">Private Key *</label>
              <textarea name="privateKey" value={formData.privateKey} onChange={handleChange} placeholder="Enter private key" rows="2" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Logo (Optional)</label>
              <input type="file" name="logo" onChange={handleChange} accept="image/*" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:bg-white file:text-blue-600 hover:file:bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">City (Optional)</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>
            <div className="lg:col-span-4">
              <label className="block text-sm font-semibold text-white mb-1">Address (Optional)</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter hospital address" className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-3 py-2 rounded focus:outline-none focus:border-white text-sm transition" />
            </div>

            <div className="lg:col-span-4 flex gap-3 pt-2">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition text-sm">Sign Up</button>
              <button type="button" onClick={() => navigate('/hospital-login')} className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-400 transition text-sm">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
