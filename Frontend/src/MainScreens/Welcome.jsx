import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';

export default function Welcome() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
            onClick={() => handleNavigation('/welcome')}
            className="text-white font-bold text-sm hover:text-blue-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            WELCOME
          </button>
          <button 
            onClick={() => handleNavigation('/patient-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            PATIENT
          </button>
          <button 
            onClick={() => handleNavigation('/doctor-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            DOCTOR
          </button>
          <button 
            onClick={() => handleNavigation('/hospital-login')}
            className="text-white font-bold text-sm hover:text-blue-200 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            HOSPITAL
          </button>
        </div>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <img src={logo} alt="One Trust Healthchain Logo" className="h-32 w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
