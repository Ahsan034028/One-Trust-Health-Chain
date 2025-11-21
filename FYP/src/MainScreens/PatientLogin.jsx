import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function PatientLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
      navigate('/patient');
    }
  };

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
            className="text-white font-bold text-sm hover:text-blue-200 transition"
          >
            WELCOME
          </button>
          <button 
            onClick={() => navigate('/patient-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition"
          >
            PATIENT
          </button>
          <button 
            onClick={() => navigate('/doctor-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition"
          >
            DOCTOR
          </button>
          <button 
            onClick={() => navigate('/hospital-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition"
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
                placeholder="PATIENT USERNAME"
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
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="font-semibold text-sm text-white hover:opacity-75 transition"
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
        portalType="Patient"
      />
    </div>
  );
}
