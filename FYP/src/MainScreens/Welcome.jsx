import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import background from '../assets/Background.jpg';

export default function Welcome() {
  const navigate = useNavigate();

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
            className="text-white font-bold text-lg hover:text-blue-200 transition"
          >
            WELCOME
          </button>
          <button 
            onClick={() => navigate('/patient-login')}
            className="text-white font-bold text-lg hover:text-blue-200 transition"
          >
            PATIENT LOGIN
          </button>
          <button 
            onClick={() => navigate('/doctor-login')}
            className="text-white font-bold text-lg hover:text-blue-200 transition"
          >
            DOCTOR PORTAL
          </button>
          <button 
            onClick={() => navigate('/hospital-login')}
            className="text-white font-bold text-lg hover:text-blue-200 transition"
          >
            HOSPITAL PORTAL
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
