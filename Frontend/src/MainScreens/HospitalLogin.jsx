import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showFingerprintScreen, setShowFingerprintScreen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setShowFingerprintScreen(false);
  }, []);

  const validateForm = () => {
    if (!walletAddress.trim() || !privateKey.trim() || !password.trim()) {
      setError('Wallet Address, Private Key, and Password are required');
      return false;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError('Wallet Address must be a valid Ethereum address (0x...)');
      return false;
    }
    if (privateKey.length < 10) {
      setError('Private Key must be at least 10 characters');
      return false;
    }
    if (!/^.{6,}$/.test(password)) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (validateForm()) {
      navigate('/hospital');
    }
  };

  // Removed fingerprint login action; repurposed button to open signup

  if (showFingerprintScreen) {
    return (
      <div className="min-h-screen flex flex-col" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Header Navigation */}
        <div className="px-4 md:px-8 py-4 flex justify-between items-center">
          <div></div>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <button 
              onClick={() => navigate('/welcome')}
              className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition"
            >
              WELCOME
            </button>
            <button 
              onClick={() => navigate('/patient-login')}
              className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition"
            >
              PATIENT
            </button>
            <button 
              onClick={() => navigate('/doctor-login')}
              className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition"
            >
              DOCTOR
            </button>
            <button 
              onClick={() => navigate('/hospital-login')}
              className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition"
            >
              HOSPITAL
            </button>
          </div>
          <div></div>
        </div>

        {/* Fingerprint Screen */}
        <div className="flex-1 flex items-center justify-center flex-col px-4">
          <div className="text-center">
            {/* Fingerprint Icon - Exact design from image */}
            <div className="mb-12">
              <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="31" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="17" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="3" fill="white"/>
              </svg>
            </div>

            {/* LOGIN WITH USERNAME Button */}
            <button
              onClick={() => setShowFingerprintScreen(false)}
              className="bg-white text-blue-600 font-bold py-3 px-16 rounded hover:bg-gray-100 transition"
            >
              LOGIN WITH USERNAME
            </button>

            {/* Forgot password */}
            <div className="mt-6">
              <button
                onClick={() => alert('Password recovery coming soon')}
                className="text-white font-semibold hover:text-red-200 transition"
              >
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Header Navigation */}
      <div className="px-4 md:px-8 py-4 flex justify-between items-center">
        <div></div>
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
          <button 
            onClick={() => handleNavigation('/welcome')}
            className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            WELCOME
          </button>
          <button 
            onClick={() => handleNavigation('/patient-login')}
            className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            PATIENT
          </button>
          <button 
            onClick={() => handleNavigation('/doctor-login')}
            className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            DOCTOR
          </button>
          <button 
            onClick={() => handleNavigation('/hospital-login')}
            className="text-white font-bold text-xs md:text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            HOSPITAL
          </button>
        </div>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-6 md:mb-8">
            <img src={logo} alt="One Trust Healthchain Logo" className="h-20 w-auto object-contain mx-auto" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 rounded text-xs bg-red-100 text-red-700">
              {error}
            </div>
          )}

          {/* Form Container */}
          <form onSubmit={handleLogin} className="space-y-3">
            {/* Wallet Address Input */}
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="WALLET ADDRESS (0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-10 py-2 text-sm rounded focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Private Key Input */}
            <div className="relative">
              <LockClosedIcon className="w-4 h-4 absolute left-3 top-3 text-white" />
              <textarea
                placeholder="PRIVATE KEY"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                rows="1"
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-10 py-2 text-sm rounded focus:outline-none focus:border-white transition resize-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockClosedIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-10 py-2 text-sm rounded focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full font-bold py-2 text-sm rounded hover:opacity-90 transition mt-4 bg-white text-blue-600"
            >
              LOGIN
            </button>

            {/* Signup Button (navigates to full-screen signup) */}
            <button
              type="button"
              onClick={() => navigate('/hospital-signup')}
              className="w-full font-bold py-2 text-sm rounded hover:opacity-90 transition mt-2 bg-transparent text-white border-2 border-white"
            >
              SIGNUP AS A HOSPITAL
            </button>
          </form>

          {/* Forgot Password and Signup */}
          <div className="text-center mt-3 space-y-2">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="block w-full font-semibold text-sm text-white hover:opacity-75 transition"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        portalType="Hospital"
      />

      {/* No inline signup modal; using dedicated route */}
    </div>
  );
}
