import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
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
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return false;
    }
    if (!/^[a-zA-Z0-9@._-]{3,}$/.test(username)) {
      setError('Username must be at least 3 characters');
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
        <div className="px-8 py-4 flex justify-between items-center">
          <div></div>
          <div className="flex gap-8">
            <button 
              onClick={() => navigate('/welcome')}
              className="text-white font-bold text-sm hover:text-red-200 transition"
            >
              WELCOME
            </button>
            <button 
              onClick={() => navigate('/patient-login')}
              className="text-white font-bold text-sm hover:text-red-200 transition"
            >
              PATIENT
            </button>
            <button 
              onClick={() => navigate('/doctor-login')}
              className="text-white font-bold text-sm hover:text-red-200 transition"
            >
              DOCTOR
            </button>
            <button 
              onClick={() => navigate('/hospital-login')}
              className="text-white font-bold text-sm hover:text-red-200 transition"
            >
              HOSPITAL
            </button>
          </div>
          <div></div>
        </div>

        {/* Fingerprint Screen */}
        <div className="flex-1 flex items-center justify-center flex-col">
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
      <div className="px-8 py-4 flex justify-between items-center">
        <div></div>
        <div className="flex gap-8">
          <button 
            onClick={() => handleNavigation('/welcome')}
            className="text-white font-bold text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            WELCOME
          </button>
          <button 
            onClick={() => handleNavigation('/patient-login')}
            className="text-white font-bold text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            PATIENT
          </button>
          <button 
            onClick={() => handleNavigation('/doctor-login')}
            className="text-white font-bold text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            DOCTOR
          </button>
          <button 
            onClick={() => handleNavigation('/hospital-login')}
            className="text-white font-bold text-sm hover:text-red-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            HOSPITAL
          </button>
        </div>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
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
            {/* Username Input */}
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="HOSPITAL USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-10 py-2 text-sm rounded focus:outline-none focus:border-white transition"
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
              LOGIN WITH USERNAME
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
