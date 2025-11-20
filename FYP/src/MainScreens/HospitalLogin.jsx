import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showFingerprintScreen, setShowFingerprintScreen] = useState(false);

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

  const handleFingerprintLogin = () => {
    setShowFingerprintScreen(true);
  };

  if (showFingerprintScreen) {
    return (
      <div className="min-h-screen flex flex-col" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Header Navigation */}
        <div className="px-16 py-6 flex justify-between items-center">
          <div></div>
          <div className="flex gap-12">
            <button 
              onClick={() => navigate('/welcome')}
              className="text-white font-bold text-lg hover:text-red-200 transition"
            >
              WELCOME
            </button>
            <button 
              onClick={() => navigate('/patient-login')}
              className="text-white font-bold text-lg hover:text-red-200 transition"
            >
              PATIENT PORTAL
            </button>
            <button 
              onClick={() => navigate('/doctor-login')}
              className="text-white font-bold text-lg hover:text-red-200 transition"
            >
              DOCTOR PORTAL
            </button>
            <button 
              onClick={() => navigate('/hospital-login')}
              className="text-white font-bold text-lg hover:text-red-200 transition"
            >
              HOSPITAL PORTAL
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
      <div className="px-16 py-6 flex justify-between items-center">
        <div></div>
        <div className="flex gap-12">
          <button 
            onClick={() => navigate('/welcome')}
            className="text-white font-bold text-lg hover:text-red-200 transition"
          >
            WELCOME
          </button>
          <button 
            onClick={() => navigate('/patient-login')}
            className="text-white font-bold text-lg hover:text-red-200 transition"
          >
            PATIENT PORTAL
          </button>
          <button 
            onClick={() => navigate('/doctor-login')}
            className="text-white font-bold text-lg hover:text-red-200 transition"
          >
            DOCTOR PORTAL
          </button>
          <button 
            onClick={() => navigate('/hospital-login')}
            className="text-white font-bold text-lg hover:text-red-200 transition"
          >
            HOSPITAL PORTAL
          </button>
        </div>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <img src={logo} alt="One Trust Healthchain Logo" className="h-24 w-auto object-contain mx-auto" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded text-sm bg-red-100 text-red-700">
              {error}
            </div>
          )}

          {/* Form Container */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="HOSPITAL USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-12 py-3 rounded focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-2 border-white text-white placeholder-white placeholder-opacity-70 px-12 py-3 rounded focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full font-bold py-3 rounded hover:opacity-90 transition mt-6 bg-white text-blue-600"
            >
              LOGIN WITH USERNAME
            </button>

            {/* Fingerprint Login Button */}
            <button
              type="button"
              onClick={handleFingerprintLogin}
              className="w-full font-bold py-3 rounded hover:opacity-90 transition mt-3 bg-transparent text-white border-2 border-white"
            >
              LOGIN WITH FINGERPRINT
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button
              onClick={() => alert('Password recovery coming soon')}
              className="font-semibold text-white hover:opacity-75 transition"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
